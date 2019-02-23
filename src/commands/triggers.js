import chalk from 'chalk'
import config from '../core/config'
import listeners from '../core/listener'
import messages from '../messages'
import actionsCore from '../core/actions'
import prompt from '../libs/inquirer'
import checks from './check'

const { getTriggerModels, selectAvailableTriggers } = listeners

const addListener = (program) => {
  program
    .command('add:listener <type>')
    .description('Add event listener')
    .action(async (type) => {
      config.getConfigurationFile()
      return listeners.addListener(type)
    })
}

/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
// const checkNullParameter = async (parameter, inputMessage, checkValidnessFunction, validnessParams) => {
//   if (!parameter) {
//     // TODO move to questions file
//     ({ id: parameter } = await prompt({
//       type: 'input',
//       name: 'id',
//       message: inputMessage,
//     }))
//     if (!checkValidnessFunction(...validnessParams)) parameter = checkNullParameter(null, inputMessage, checkValidnessFunction, validnessParams)
//   }
//   return parameter
// }

const checkNullParameters = async (triggerEvent, eventId, filterId, actionId) => {
  // TODO: refactor
  if (!triggerEvent) {
    for (;;) {
      // TODO move to questions file
      ({ id: triggerEvent } = await prompt({
        type: 'input',
        name: 'id',
        message: 'Please enter a trigger event:',
      }))
      if (checks.checkTrigger(triggerEvent)) break
    }
  }

  if (!eventId) {
    for (;;) {
      // TODO move to questions file
      ({ id: eventId } = await prompt({
        type: 'input',
        name: 'id',
        message: 'Please enter a valid event id (in the form form groupName.eventId):',
      }))
      if (checks.checkEvent(eventId)) break
    }
  }

  if (!filterId) {
    for (;;) {
      // TODO move to questions file
      ({ id: filterId } = await prompt({
        type: 'input',
        name: 'id',
        message: 'Please enter a valid filter id:',
      }))
      if (checks.checkFilter(eventId, filterId)) break
    }
  }

  if (!actionId) {
    for (;;) {
      // TODO move to questions file
      ({ id: actionId } = await prompt({
        type: 'input',
        name: 'id',
        message: 'Please enter a valid action id:',
      }))
      if (actionsCore.actionExists(eventId, filterId, actionId)) break // TODO change it to behave like check.checkFilters functions
    }
  }

  return { triggerEvent, eventId, filterId, actionId }
}

/**
 * Adds a trigger (another event) to be called in the case of success or failure of
 * an event action.
 */
const addActionTrigger = (program) => {
  program
    .command('add:trigger [_triggerEvent] [_eventId] [_filterId] [_actionId]')
    .description('Add a new trigger to an action')
    .action(async (_triggerEvent, _eventId, _filterId, _actionId) => {
      try {
        config.getConfigurationFile()

        const { triggerEvent, eventId, filterId, actionId } = await checkNullParameters(_triggerEvent, _eventId, _filterId, _actionId)

        if (!checks.checkTrigger(triggerEvent)) return false
        if (!checks.checkEvent(eventId)) return false
        if (!checks.checkFilter(eventId, filterId)) return false

        const actionExists = actionsCore.actionExists(eventId, filterId, actionId)
        if (!actionExists) return false

        const eventsToBeCalled = await selectAvailableTriggers({ ignoredEvents: [eventId] })

        if (eventsToBeCalled.length === 0) return false

        const triggerModels = await getTriggerModels(eventsToBeCalled)

        const created = actionsCore.createTrigger({ triggerEvent, triggerModels, eventId, filterId, actionId })

        if (created) {
          const eventIds = eventsToBeCalled.map(e => e.eventId)
          messages.success(`Trigger created: ${chalk.blue.bold(eventIds)} will be called ` +
            `under the condition ${chalk.blue.bold(triggerEvent)} ` +
            `of action action ${chalk.blue.bold(`${actionId}`)} on event ${chalk.blue.bold(`${eventId}:${filterId}`)}.`)
          // messages.info('Check the action template at the YAML file and replace its ') // TODO add next actions tip pointing to documentation
        }

        return created
      } catch (e) {
        console.error(e)
        return false
      }
    })
}

export default {
  init: (program) => {
    addListener(program)
  },
  addActionTrigger,
}
