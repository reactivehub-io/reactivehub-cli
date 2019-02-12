import chalk from 'chalk'
import config from '../core/config'
import listeners from '../core/listener'
import messages from '../messages'
import actionsCore from '../core/actions'
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

const addTrigger = (program) => {
  program
    .command('add:trigger <triggerEvent> <eventId> <filterId> <actionId>')
    .description('Add a new trigger to an action')
    .action(async (triggerEvent, eventId, filterId, actionId) => {
      try {
        config.getConfigurationFile()
        if (!checks.checkEvent(eventId)) return false
        if (!checks.checkFilter(eventId, filterId)) return false
        const actionExists = actionsCore.actionExists(eventId, filterId, actionId)
        if (!actionExists) return false
        if (!checks.checkTrigger(triggerEvent)) return false

        const eventsToBeCalled = await selectAvailableTriggers()
        // TODO verificar recursão de eventos -> caso eventsToBeCalled contenha eventId, o que faremos?
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
  addTrigger,
}
