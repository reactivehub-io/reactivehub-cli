import chalk from 'chalk'
import { run } from '../core/eventCheck/check'
import config from '../core/config'
import event from '../core/event'
import messages from '../messages'
import filter from '../core/filter'

const checkTrigger = (trigger) => {
  const validTriggers = ['onSuccess', 'onFailure']
  if (!validTriggers.includes(trigger)) {
    messages.error('Inexistent trigger. Please specify a valid trigger.')
    const availableTriggersInfo = validTriggers.map(t => ` ${chalk.blue.bold(`${t}`)}`)
    messages.info(`Available triggers are:${availableTriggersInfo}`)
    return false
  }
  return true
}

const testAll = (program) => {
  program
    .command('test')
    .description('Check event payload')
    .action(async () => {
      config.getConfigurationFile()
      return run()
    })
}

const checkEvent = (eventId) => {
  if (!event.eventExists(eventId)) {
    messages.error(`Event ${chalk.blue.bold(eventId)} does not exist!`)
    return false
  }
  return true
}

const checkFilter = (eventId, filterId) => {
  if (!filter.filterExists(eventId, filterId)) {
    messages.error(`Filter ${chalk.blue.bold(filterId)} does not exist on ${chalk.blue.bold(eventId)}.`)
    return false
  }
  return true
}

export default {
  checkEvent,
  checkFilter,
  checkTrigger,
  testAll,
}
