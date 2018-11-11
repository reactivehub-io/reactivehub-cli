import event from '../event'
import QueryUtils from '../../libs/query'
import Objects from '../../libs/objects'
import ServiceAccounts from '../../serviceAccounts'
import logMessages from '../../messages/checkDeploy'
import ErrorLog from './errorLog'
import ActionMap from '../../actions'

const actionExists = ({ type, actionType, operation }) => {
  const map = ActionMap.getActionConfig(type, actionType)
  if (!map) return { status: false, messages: [`Action "${type}/${actionType}" does not exists. Check the ${type} documentation.`] }

  if (operation) {
    const { actions } = map
    const hasOperation = actions.filter(act => act.name === operation).length > 0
    if (!hasOperation) {
      return {
        status: false,
        messages: [`Operation "${operation}" of action "${type}/${actionType}" does not exists. Check the ${type} documentation.`],
      }
    }
  }
  return { status: true }
}

const checkAction = async ({ action, filter }) => {
  const { id, type, action: actionType, serviceAccountId, operation } = action
  const prefix = `Action: ${filter}:${id} `
  const required = Objects.checkRequired(action, ['id', 'type', 'action', 'serviceAccountId'], prefix)
  let status = true
  let messages = []

  if (!required.status) {
    status = false
    messages = messages.concat(required.messages)
  }

  const checkActionExists = actionExists({ type, actionType, operation })
  if (!checkActionExists.status) {
    status = false
    messages = messages.concat(checkActionExists.messages)
  }

  const checkServiceAccount = await ServiceAccounts.isServiceAccountOfType({ type, id: serviceAccountId })
  if (!checkServiceAccount) {
    status = false
    messages.push(`Service Account "${serviceAccountId}" is not a valid "${type}" service type.`)
  }

  return { status, filter, action: id, messages }
}

const checkConditionFilter = ({ id, condition }) => {
  if (!condition) return { status: true, messages: [] }
  return { filter: id, ...QueryUtils.checkQuery(condition) }
}

const checkFilters = async (filter) => {
  const { id, condition, actions = [] } = filter
  const checkCondition = checkConditionFilter({ id, condition })
  let { status } = checkCondition

  let actionErrors = []
  if (actions) {
    actionErrors = await Promise.all(actions.map(action => checkAction({ filter: id, action })))
      .then(actionVerify => actionVerify.filter(({ status: verifyStatus }) => !verifyStatus))
  }

  if (actionErrors.length > 0) status = false

  let errors = []

  const requiredFields = Objects.checkRequired(filter, ['id'], 'Filters: ')
  if (!requiredFields.status) {
    status = false
    errors.push({ filter: id, ...requiredFields })
  }
  if (!checkCondition.status) errors.push(checkCondition)
  if (actionErrors.length > 0) errors = errors.concat(actionErrors)

  return { id, status, errors }
}

const checkModel = (id, model) => ({ id, ...QueryUtils.checkPropertyTypes(model) })

export const checkEvent = async (id) => {
  const eventPayload = event.loadEventData(id)
  const { model = {}, filters = [] } = eventPayload

  const requiredVerify = Objects.checkRequired(eventPayload, ['id', 'model', 'filters'])
  const modelVerify = checkModel(id, model)
  let { status } = requiredVerify

  const { status: modelStatus } = modelVerify
  if (!modelStatus) status = modelStatus

  const filterErrors = (filters && await Promise.all(filters.map(filter => checkFilters(filter)))
    .then(verify => verify.filter(({ status: verifyStatus }) => !verifyStatus))) || []

  let errors = []
  let totalErrors = 0
  if (!requiredVerify.status) {
    errors = errors.concat(requiredVerify)
    const { messages = [] } = requiredVerify
    totalErrors += messages.length
  }
  if (!modelVerify.status) {
    errors = errors.concat(modelVerify)
    const { messages = [] } = requiredVerify
    totalErrors += messages.length
  }
  if (filterErrors.length > 0) {
    filterErrors.forEach((error) => {
      errors = errors.concat(error.errors)
      totalErrors += errors.map(err => err.messages.length).reduce((a, b) => a + b)
    })
    status = false
  }

  return { id, totalErrors, status, errors }
}


export const checkAll = async ({ outputLogFile = true } = {}) => {
  const events = event.getEventsInFolder()
  logMessages.totalBeignProcessed(events.length)
  const errors = await Promise.all(events.map(item => checkEvent(item)))
    .then(verify => verify.filter(({ status: verifyStatus }) => !verifyStatus))

  const totalErrors = errors.length
  const status = totalErrors === 0

  let logFileLink = null
  if (outputLogFile) logFileLink = await ErrorLog.create(totalErrors, errors)

  return { status, logFileLink, errors, totalErrors }
}

export const run = async ({ isDeploy = false } = {}) => {
  logMessages.testing()
  const { status, errors, totalErrors, logFileLink } = await checkAll()
  if (!status) {
    console.log(status)
    errors.forEach((error) => {
      const { id: eventId, totalErrors: total } = error
      logMessages.eventErrors(eventId, total)
    })
    logMessages.hasErrors(totalErrors, logFileLink, isDeploy)
    return false
  }
  logMessages.testPassed()
  return true
}
