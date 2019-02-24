import chalk from 'chalk'
import config from '../core/config'
import listeners from '../core/listener'
import messages from '../messages'
import actionsCore from '../core/actions'
import prompt from '../libs/inquirer'
import checks from './check'
import questions from './questions/triggers'

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
const checkNullParameters = async (triggerEvent, eventId, filterId, actionId) => {
  if (!triggerEvent) {
    ({ id: triggerEvent } = await prompt(questions.enterTriggerEvent))
  }

  if (!eventId) {
    ({ id: eventId } = await prompt(questions.enterEventId))
  }

  if (!filterId) {
    const filterIdQuestion = questions.enterFilterId[0]
    filterIdQuestion.validate = input => !input || checks.checkFilter(eventId, input);
    ({ id: filterId } = await prompt(filterIdQuestion))
  }

  if (!actionId) {
    const actionIdQuestion = questions.enterActionId[0]
    actionIdQuestion.validate = input => !input || checks.checkAction(eventId, filterId, input);
    ({ id: actionId } = await prompt(questions.enterActionId))
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

        const actionExists = checks.checkAction(eventId, filterId, actionId)
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
