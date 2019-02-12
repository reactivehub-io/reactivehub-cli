import chalk from 'chalk'
import fs from 'fs-extra'
import * as api from '../services/api'
import messages from '../messages'
import ServiceAccounts from '../serviceAccounts'
import questions from '../commands/questions/listener'
import prompt from '../libs/inquirer'
import config from './config'
import yaml from './yaml'

const getAvailableListenerTypes = async (type) => {
  const types = await api.getAvailableListenerTypes(type) || []
  return (types.length > 0 && types) || null
}

const checkAvailableListner = (availableListeners, type) => {
  if (!availableListeners) {
    messages.error(`Listener of type ${chalk.blue.bold(type)} does not exist!`)
    messages.info('Go to https://console.reactivehub.io/listeners/add for more info.')
    return false
  }
  return true
}

const createFile = ({ serviceAccountId, type: serviceAccountType, listenerType, model, triggers }) => {
  const listenerFolder = config.folders.listeners()
  const folderPath = `${listenerFolder}/${serviceAccountId}`
  const yamlPayload = {
    serviceAccountId,
    serviceAccountType,
    listener: listenerType,
    triggers,
    source_model: model,
  }

  const created = yaml.create(folderPath, listenerType, yamlPayload)
  if (created) messages.success(`${serviceAccountType} listener ${chalk.blue.bold(`${serviceAccountId}.${listenerType}`)} successfully created!`)
  return created
}

const loadTriggers = async (triggers = [], loadedEvents = null) => {
  let newTriggers = triggers
  let eventIds = loadedEvents || await api.getEventIds()

  if (!eventIds) {
    messages.info('Could not find deployed events. Deploy your events and run the add:listener trigger command.')
  } else {
    const { eventId } = await prompt(questions.selectEvent(eventIds))
    newTriggers.push({ eventId })

    eventIds = eventIds.filter(({ id }) => id !== eventId)

    if (eventIds.length <= 0) return newTriggers

    const { addMoreTriggers } = await prompt(questions.addMoreTriggers)
    if (addMoreTriggers) {
      newTriggers = loadTriggers(newTriggers, eventIds)
    }
  }
  return newTriggers
}

const getTriggerModels = async (triggers = []) =>
  Promise.all(triggers.map(({ eventId }) => api.getEventModel(eventId).then(model => ({ eventId, payload: model }))))

const addListener = async (type) => {
  try {
    const [serviceAccounts, availableListeners] = await Promise.all([
      ServiceAccounts.getServiceAccounts({ type }),
      getAvailableListenerTypes(type),
    ])

    if (!checkAvailableListner(availableListeners)) return false

    if (!ServiceAccounts.checkSeviceAccounts(serviceAccounts, type)) return false

    const { serviceAccountId, listenerType } = await prompt(questions.create(serviceAccounts, availableListeners))

    const model = await api.getListenerModel(type, listenerType)

    const { addTrigger } = await prompt(questions.addTrigger)

    let triggers = null

    if (addTrigger) {
      const { eventConfirm } = await prompt(questions.confirmTriggeredEvents)
      if (eventConfirm) {
        triggers = await getTriggerModels(await loadTriggers())
      }
    }

    return createFile({ serviceAccountId, type, listenerType, model, triggers })
  } catch (e) {
    console.log(e)
    return false
  }
}

const getListenersFileMaps = () => {
  const listenerFolder = config.folders.listeners()
  if (!fs.pathExistsSync(listenerFolder)) return []

  const dirs = fs.readdirSync(listenerFolder)
  const files = dirs.map(dir => ({ dir: `${listenerFolder}/${dir}`, files: fs.readdirSync(`${listenerFolder}/${dir}`) }))
  return files
}

const prepareDeploy = (dir, file, namespace) => {
  const content = yaml.toJson(dir, file)
  const { serviceAccountId, serviceAccountType, listener, triggers } = content
  const id = `${namespace}:${listener}:${serviceAccountId}`
  const newListener = { serviceAccountId, serviceAccountType, listener }
  return {
    newListener: { ...newListener, id },
    newListenerTrigger: triggers && triggers.map(({ eventId, payload }) =>
      ({ eventId, payload, listenerType: listener, listener_id: id, serviceAccountId })),
  }
}

export default {
  getAvailableListenerTypes,
  addListener,
  getListenersFileMaps,
  prepareDeploy,
  loadTriggers,
  getTriggerModels,
}
