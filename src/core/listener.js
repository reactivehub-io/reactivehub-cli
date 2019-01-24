import chalk from 'chalk'
import * as api from '../services/api'
import messages from '../messages'
import ServiceAccounts from '../serviceAccounts'
import questions from '../commands/questions/listener'
import prompt from '../libs/inquirer'

const getAvailableListenerTypes = async (type) => {
  const types = await api.getAvailableListenerTypes(type) || []
  return (types.length > 0 && types) || null
}

const checkAvailableListner = (availableListeners, type) => {
  if (!availableListeners) {
    messages.error(`Listener of type ${chalk.blue.bold(type)} does not exists!`)
    messages.info('Go to https://console.reactivehub.io/listeners/add for more info.')
    return false
  }
  return true
}

const showSuccess = ({ type, listenerType, serviceAccountId }) => {

}

const createFile = ({ serviceAccountId, type: servieAccountType, listenerType, triggers }) => {
  console.log('TODO BUILD YAML')
  console.log({ serviceAccountId, servieAccountType, listener: listenerType, triggers })
}

const addListener = async (type) => {
  console.log('type => ', type)
  try {
    const [serviceAccounts, availableListeners] = await Promise.all([
      ServiceAccounts.getServiceAccounts({ type }),
      getAvailableListenerTypes(type),
    ])

    if (!checkAvailableListner(availableListeners)) return false

    if (!ServiceAccounts.checkSeviceAccounts(serviceAccounts, type)) return false

    const { serviceAccountId, listenerType } = await prompt(questions.create(serviceAccounts, availableListeners))

    const model = await api.getListenerModel(type, listenerType)

    const { addTrigger } = await prompt(questions.addTrigger)

    let triggers = null

    if (addTrigger) {
      const { eventConfirm } = await prompt(questions.confirmTriggeredEvents)
      if (eventConfirm) {
        triggers = []
        console.log(eventConfirm)
      }
    }

    return createFile({ serviceAccountId, type, listenerType, triggers })
  } catch (e) {
    console.log(e)
    return false
  }
}

export default {
  getAvailableListenerTypes,
  addListener,
}
