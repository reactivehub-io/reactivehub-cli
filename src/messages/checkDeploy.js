import chalk from 'chalk'
import messages from './index'

export default {
  testing: (eventId = '') => messages.info(`Validating event${eventId ? ` ${eventId} ` : ' '}configuration data.`),
  totalBeignProcessed: (total = 0) => messages.info(`Checking ${total} event(s).`),
  hasErrors: (totalErrors = 0, logFileLink = null, deploy = false, type = 'events') => {
    let errorMessage = chalk.red(`Test failed, ${totalErrors} ${type} with errors${deploy ? ', could not deploy' : ''}.\n`)
    if (logFileLink) errorMessage += chalk.red(`This is not a problem with Reactivehub services, check the log file for more info ${logFileLink}\n`)
    messages.error(errorMessage)
    console.log('')
  },
  eventErrors: (eventId, total) => messages.error(`Event ${eventId} ${total} error(s) found.`),
  testPassed: (deploy = false) => {
    console.log('')
    messages.success(chalk.green(`Event config test passed${deploy ? ', starting deploy.' : '.'}`))
    console.log('')
  },
  startingDeploy: (type = 'all') => messages.info(`Deploy ${type} started.`),
  eventDeploySuccess: (eventId, type='Event') => messages.success(`${type} "${eventId}" successfully deployed.`),
  listenerDeploySuccess: id => messages.success(`Listener "${id}" successfully deployed.`),
  deployFinished: (total, types = 'events') => messages.success(`${total} ${types} successfully deployed.`),
  queryErrors: () => messages.error('Could not deploy your queries; This is not a problem with Reactivehub services, check the log for more info'),
}
