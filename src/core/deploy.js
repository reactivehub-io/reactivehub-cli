import { sendEvent, sendEventFilter, sendListener, sendListenerTrigger, sendQuery, sendAction, sendDeploy } from '../services/api'
import auth from './auth'
import ActionMap from '../actions'
import * as check from './eventCheck/check'
import messages from '../messages/checkDeploy'
import listeners from '../core/listener'
import queries from './queries'
import config from '../core/config'
import yaml from './yaml'

const loadEvent = id => yaml.toJson(config.folders.events(), id)
const getEventsInFolder = () => yaml.filesInFolder(config.folders.events()).map(item => item.replace('.yaml', ''))

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
  if (actionPromises) await Promise.all(actionPromises)
  return true
}

const deployEvent = async (eventName, { withMessage = true } = {}) => {
  const { id: eventId, eventGroup, version, model, filters } = loadEvent(eventName)
  const payload = {
    eventId,
    name: eventId,
    eventGroup,
    version,
    model,
    team: namespace,
    namespace,
  }

  await sendEvent(payload).then(() => withMessage && messages.eventDeploySuccess(`${eventId}`))

  const filterPromises = filters.map(filter => deployFilter(eventId, filter, { withMessage }))

  await Promise.all(filterPromises)
}

const deployEvents = async () => {
  const testStatus = await check.run({ isDeploy: true })
  if (testStatus) {
    messages.startingDeploy('EVENTS')
    const events = getEventsInFolder()
    const deployPromises = events.map(eventModel => deployEvent(eventModel))
    await Promise.all(deployPromises)
    messages.deployFinished(events.length)
    sendDeploy({ command: 'deploy:event' })
    return true
  }
  return false
}

const deployListener = async () => {
  messages.startingDeploy('LISTENERS')
  const fileMap = listeners.getListenersFileMaps()
  const deployActions = []
  fileMap.forEach(({ dir, files }) => files.forEach(file => deployActions.push(listeners.prepareDeploy(dir, file, namespace))))
  const deployStatus = deployActions.map(async ({ newListener, newListenerTrigger }) => {
    const { serviceAccountId, listener } = newListener
    await sendListener({ namespace, ...newListener })
    await Promise.all(newListenerTrigger.map(trigger => sendListenerTrigger({ ...trigger, namespace })))
    messages.listenerDeploySuccess(`${serviceAccountId}.${listener}`)
  })
  await Promise.all(deployStatus)
  sendDeploy({ command: 'deploy:listener' })
  messages.deployFinished(deployActions.length, 'listeners')
}


const deployQuery = async () => {
  try {
    messages.startingDeploy('QUERIES')
    const fileMap = queries.getFileMap()
    const deployActions = []
    fileMap.forEach(({ dir, files }) => files.forEach(file => deployActions.push(queries.prepareDeploy(dir, file, namespace))))
    const deployStatus = deployActions.map(async item => sendQuery(item).then(() => messages.eventDeploySuccess(item.id, 'Query')))
    await Promise.all(deployStatus)
    sendDeploy({ command: 'deploy:query' })
    messages.deployFinished(deployActions.length, 'queries')
  } catch (e) {
    messages.queryErrors()
  }
}

const deployAll = async () => {
  sendDeploy({ command: 'deploy:all' })
  await deployEvents()
  await deployListener()
  await deployQuery()
}

export default {
  deployAll,
  deployListener,
  deployEvents,
  deployQuery,
  deployEvent,
}
