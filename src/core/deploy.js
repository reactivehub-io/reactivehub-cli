import event from './event'
import { sendEvent, sendEventFilter } from '../services/api'
import auth from './auth'
import ActionMap from '../actions'
import * as check from './eventCheck/check'
import messages from '../messages/checkDeploy'
import listeners from '../core/listener'

const { loadEvent, getEventsInFolder } = event
const namespace = auth.getNamespace()
const actionErrors = []

const deployAction = async (eventId, filterId, action) => {
  const payload = {
    eventId,
    ruleId: filterId,
    namespace,
  }

  const { type, action: actionType, operation, id } = action
  const map = ActionMap.getActionConfig(type, actionType)
  if (!map) return false

  let actionDeploy = map.deploy
  if (operation) {
    const { actions: actionMap = [] } = map
    const { deploy: operationDeploy } = actionMap.filter(actionMapItem => actionMapItem.name === operation).shift() || {}
    if (operationDeploy) actionDeploy = operationDeploy
  }

  if (!actionDeploy) {
    actionErrors.push({ eventId, filterId, message: `Could not deploy action ${id}, invalid action config, check the documentation.` })
    return false
  }

  const deployStatus = await actionDeploy(action, payload)
  return deployStatus
}

const deployFilter = async (eventId, filter) => {
  const { id, name, condition, actions = [] } = filter
  const payload = {
    id,
    eventId,
    name,
    condition,
    namespace,
  }
  await sendEventFilter(payload)
  const actionPromises = actions && actions.map(action => deployAction(eventId, id, action).catch((err) => {
    console.error(err)
    return false
  }))
  await Promise.all(actionPromises)
  return true
}

const deployEvent = async (eventName) => {
  const { id: eventId, eventGroup, name, version, model, filters } = loadEvent('events', eventName)
  const payload = {
    eventId,
    name,
    eventGroup,
    version,
    model,
    team: namespace,
    namespace,
  }

  await sendEvent(payload).then(() => messages.eventDeploySuccess(`${eventGroup}.${eventId}`))

  const filterPromises = filters.map(filter => deployFilter(eventId, filter))

  await Promise.all(filterPromises)
}

const deployAll = async () => {
  const testStatus = await check.run({ isDeploy: true })
  if (testStatus) {
    messages.startingDeploy()
    const events = getEventsInFolder()
    const deployPromises = events.map(eventModel => deployEvent(eventModel))
    await Promise.all(deployPromises)
    messages.deployFinished(events.length)
    return true
  }
  return false
}

const deployListener = async (ids = null) => {
  messages.startingDeploy('listeners')
  const fileMap = listeners.getListenersFileMaps()
  fileMap.map(({ dir, files }) => {
    return files.map(file => listeners.openListenerFile(dir, file))
  })
  console.log(fileMap)
}

export default {
  deployAll,
  deployListener,
}
