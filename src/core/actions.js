import chalk from 'chalk'
import messages from '../messages'
import filter from '../core/filter'
import event from '../core/event'
import yaml from './yaml'

const { getFilter } = filter
const folder = 'events'

const actionExists = (eventId, filterId, actionId) => {
  const { actions = [] } = getFilter(eventId, filterId) || {}
  return actions && actions.filter(({ id }) => id === actionId).length > 0
}

const createAction = (params) => {
  const { eventId, filterId, id: actionId } = params
  const actionPayload = params
  delete actionPayload.eventId
  delete actionPayload.filterId
  const eventPayload = event.loadEvent(folder, eventId)
  const filterConfig = eventPayload.filters.find(({ id }) => id === filterId)
  if (!filterConfig.actions) filterConfig.actions = []

  const foundAction = filterConfig.actions.find(action => action.id === actionId)
  if (foundAction) {
    filterConfig.actions = filterConfig.actions.map((action) => {
      if (action.id === actionId) return actionPayload
      return action
    })
  } else {
    filterConfig.actions.push(actionPayload)
  }

  eventPayload.filters = eventPayload.filters.map((filterMap) => {
    if (filterMap.id === filterId) return filterConfig
    return filterMap
  })


  const created = yaml.create(folder, eventId, eventPayload)

  if (created) {
    messages.success(`Action ${chalk.blue.bold(actionId)} on event ${chalk.blue.bold(`${eventId}:${filterId}`)} successfully created!`)
    messages.info('Check the action template at the YAML file and replace its properties with the event model parameters (wildcards allowed). Check the documentation for more info https://docs.reactivehub.io/guide/events/actions#wildcards')
  }

  return created
}

const createTrigger = (params) => {
  const { triggerEvent, triggerModels, eventId, filterId, actionId } = params

  const eventPayload = event.loadEvent(folder, eventId)

  const filterConfig = eventPayload.filters.find(({ id }) => id === filterId)
  if (!filterConfig.actions) filterConfig.actions = []

  const foundAction = filterConfig.actions.find(action => action.id === actionId)

  if (foundAction) {
    filterConfig.actions = filterConfig.actions.map((action) => {
      if (action.id === actionId) {
        const modifiedAction = action
        modifiedAction[triggerEvent] = triggerModels
        return modifiedAction
      }
      return action
    })
  } else {
    messages.error(`Could not find action ${chalk.blueBright(actionId)}!`)
    throw new Error('Action not found. Run "rhub add:action" to add a new action.')
  }

  eventPayload.filters = eventPayload.filters.map((filterMap) => {
    if (filterMap.id === filterId) return filterConfig
    return filterMap
  })

  const created = yaml.create(folder, eventId, eventPayload)

  if (created) {
    messages.success(`Trigger ${chalk.blue.bold(triggerEvent)} on event ${chalk.blue.bold(`${eventId}:${filterId}`)} successfully created!`)
    // messages.info('Check the action template at the YAML file and replace its ') // TODO add next actions tip
  }

  return created
}


export default {
  createAction,
  actionExists,
  createTrigger,
}
