import chalk from 'chalk'
import config from '../core/config'
import listeners from '../core/listener'
import messages from '../messages'
import actionsCore from '../core/actions'
import filter from '../core/filter'
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
const gatherInputParameters = async (triggerEvent, eventId, filterId, actionId) => {
  if (!triggerEvent) {
    ({ id: triggerEvent } = await prompt(questions.enterTriggerEvent))
  }

  if (!eventId) {
    ({ id: eventId } = await prompt(questions.enterEventId))
  }

  if (!filterId) {
    const filterIdQuestion = questions.enterFilterId
    filterIdQuestion.choices = filter.getAllFilters(eventId).map(i => i.id);
    ({ id: filterId } = await prompt(filterIdQuestion))
  }

  if (!actionId) {
    const actionIdQuestion = questions.enterActionId
    actionIdQuestion.choices = actionsCore.getActions(eventId, filterId).map(i => i.id);
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
    .command('add:trigger [triggerEvent] [eventId] [filterId] [actionId]')
    .description('Add a new trigger to an action')
    .action(async (triggerEvent, eventId, filterId, actionId) => {
      try {
        config.getConfigurationFile()

        if ([triggerEvent, eventId, filterId, actionId].includes(undefined)) {
          ({ triggerEvent, eventId, filterId, actionId } = await gatherInputParameters(triggerEvent, eventId, filterId, actionId))
        }

        if (!checks.checkTrigger(triggerEvent)) return false
        if (!checks.checkEvent(eventId)) return false
        if (!checks.checkFilter(eventId, filterId)) return false
        if (!checks.checkAction(eventId, filterId, actionId)) return false


        const eventsToBeCalled = await selectAvailableTriggers({ ignoredEvents: [eventId] })

        if (eventsToBeCalled.length === 0) return false

        const triggerModels = await getTriggerModels(eventsToBeCalled)

        const created = actionsCore.createTrigger({ triggerEvent, triggerModels, eventId, filterId, actionId })

        if (created) {
          const eventIds = eventsToBeCalled.map(e => e.eventId)
          messages.success(`Trigger created: ${chalk.blue.bold(eventIds)} will be called ` +
            `under the condition ${chalk.blue.bold(triggerEvent)} ` +
            `of action action ${chalk.blue.bold(`${actionId}`)}`)
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
