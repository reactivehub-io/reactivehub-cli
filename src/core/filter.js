import chalk from 'chalk'
import yaml from './yaml'
import messages from '../messages'
import event from './event'
import config from '../commands/config'

const folder = 'events'

const getAllFilters = (eventId, { eventPayload } = {}) => {
  const checkEventPayload = eventPayload || event.loadEvent(folder, eventId)
  return checkEventPayload.filters || []
}

const getFilter = (eventId, filterId, { eventPayload } = {}) => getAllFilters(eventId, { eventPayload })
  .filter(item => item.id === filterId)[0]


const filterExists = (eventId, filterId, { eventPayload } = {}) =>
  getFilter(eventId, filterId, { eventPayload })

const createFile = (payload, { override = false } = {}) => {
  const { eventId, id, name, condition } = payload

  const fileName = eventId
  const newPayload = { id, name, condition, actions: null }

  if (!yaml.fileExists(folder, fileName)) {
    messages.error(`${chalk.blue.bold(fileName)} not found in folder!`)
    return false
  }

  const eventPayload = event.loadEvent(folder, fileName)

  const checkFilterExists = filterExists(fileName, id, { eventPayload })

  if (checkFilterExists && !override) {
    messages.error(`RULE ${chalk.blue.bold(id)} already exists in event ${chalk.blue.bold(eventId)}!`)
    return false
  }

  eventPayload.filters.push(newPayload)

  const created = yaml.create(folder, fileName, eventPayload)
  if (created) {
    messages.success(`Filter ${chalk.blue.bold(id)} on event ${eventId} successfully created!`)
    messages.info(`To add an action to this rule run ${chalk.yellow(config.addActionOnFilter(eventId, id))}`)
  }

  return created
}

const getEventsInFolder = () => yaml.filesInFolder('events').map(item => item.replace('.yaml', ''))

export default {
  createFile,
  getEventsInFolder,
  filterExists,
  getAllFilters,
  getFilter,
}
