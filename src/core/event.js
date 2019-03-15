import { flatten, unflatten } from 'flat'
import chalk from 'chalk'
import yaml from './yaml'
import messages from '../messages'
import { sendAddEventCommand } from '../services/api'
import deploy from './deploy'

const folder = 'events'
const eventExists = eventId => yaml.fileExists(folder, eventId)

const createFile = (payload, { withExample = false, override = false } = {}) => {
  const { id, eventGroup, version = '0.0.1', model = null, rules = null } = payload
  const name = id
  const fileName = `${eventGroup}.${id}`

  const newPayload = { id: `${eventGroup}.${id}`, name, eventGroup, version }

  if (withExample || !model) {
    newPayload.model = {
      keyName: 'String',
    }
  }

  if (!rules) {
    const onEventFilter = {
      id: 'on-event',
      name: 'onEvent',
      condition: null,
      actions: null,
    }
    newPayload.filters = [onEventFilter]
  }

  if (!override && yaml.fileExists(folder, fileName)) {
    messages.error(`${chalk.blue.bold(fileName)} already exists!`)
    return false
  }

  const created = yaml.create(folder, fileName, newPayload)
  if (created) messages.success(`${chalk.blue.bold(fileName)} successfully created!`)

  sendAddEventCommand({ id })
  deploy.deployEvent(newPayload.id, { withMessage: true })
  return created
}

const getEventsInFolder = () => yaml.filesInFolder('events').map(item => item.replace('.yaml', ''))

const loadEvent = (folderParam, fileName) => yaml.toJson(folderParam, fileName)

const loadEventData = fileName => loadEvent('events', fileName)

const loadModelAsPayload = (eventId) => {
  const { model } = yaml.toJson('events', eventId)
  const flatPayload = flatten(model, { maxDepth: null, safe: true })
  Object.keys(flatPayload).forEach((key) => { model[key] = `{${key}}` })
  return unflatten(model, { maxDepth: null })
}


export default {
  createFile,
  getEventsInFolder,
  loadEvent,
  eventExists,
  loadModelAsPayload,
  loadEventData,
}
