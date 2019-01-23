import ServiceAccounts from '../serviceAccounts'
import listeners from '../core/listener'
import questions from './questions/listener'
import prompt from '../libs/inquirer'
import ListenerConfig from '../listeners'

const addListener = (program) => {
  program
    .command('add:listener <type>')
    .description('Add event listener')
    .action(async (type) => {
      try {
        const config = ListenerConfig[type]
        // TODO - CHECK IF LISTENER EXISTS
        if (!config) {
          
        }

        const serviceAccounts = await ServiceAccounts.getServiceAccountsOfType(type)
        if (!serviceAccounts) return false

        const availableListeners = await listeners.getListenerTypes(type)

        const { serviceAccountId, listenerType } = await prompt(questions.create(serviceAccounts, availableListeners))

        return true
      } catch (e) {
        console.log(e)
        return false
      }
    })
}

export default {
  init: (program) => {
    addListener(program)
  },
}
