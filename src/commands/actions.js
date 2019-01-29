import chalk from 'chalk'

import prompt from '../libs/inquirer'
import event from '../core/event'
import filter from '../core/filter'
import messages from '../messages'
import actions from '../actions'
import actionsCore from '../core/actions'
import ServiceAccounts from '../serviceAccounts'
import Questions from './questions/action'
import config from '../core/config'

const checkEvent = (eventId) => {
  if (!event.eventExists(eventId)) {
    messages.error(`${chalk.blue.bold(eventId)} does not exists!`)
    return false
  }
  return true
}

const checkFilter = (eventId, filterId) => {
  if (!filter.filterExists(eventId, filterId)) {
    messages.error(`Filter ${chalk.blue.bold(filterId)} does not exists on ${chalk.blue.bold(eventId)}.`)
    return false
  }
  return true
}

const actionQuestions = async (actionConfig, { id, eventId, filterId, type, action, serviceAccountId, async }) => {
  try {
    const { actions: configActions = [] } = actionConfig
    let { questions, buildTemplate } = actionConfig

    let operation = null
    if (configActions && configActions.length > 0) {
      const { operation: selectedOperation } = await prompt(Questions.chooseActionOperation(action, configActions.map(({ name }) => name)))
      const filteredOperation = configActions.filter(({ name }) => name === selectedOperation).shift() || {}
      const { buildTemplate: operationTemplate, questions: operationQuestions } = filteredOperation
      buildTemplate = operationTemplate
      operation = selectedOperation
      questions = operationQuestions
    }
    const creatActionPayload = {
      id,
      async,
      eventId,
      filterId,
      type,
      action,
      operation,
      serviceAccountId,
    }

    const eventPayloadModel = event.loadModelAsPayload(eventId)
    if (questions) {
      return prompt(questions(eventPayloadModel))
        .then(answers => actionsCore.createAction({
          ...creatActionPayload,
          template: buildTemplate(answers, eventPayloadModel),
        })).catch(err => console.error(err))
    }

    return actionsCore.createAction({
      ...creatActionPayload,
      template: buildTemplate({}, eventPayloadModel),
    })
  } catch (e) {
    console.log(e)
    return false
  }
}

const addAction = (program) => {
  program
    .command('add:action <eventId> <filterId> <type> <action>')
    .description('Add a new event')
    .action(async (eventId, filterId, type, action) => {
      try {
        config.getConfigurationFile()
        if (!checkEvent(eventId)) return false
        if (!checkFilter(eventId, filterId)) return false
        const actionConfig = actions.getActionConfig(type, action)
        if (!actionConfig) return false
        const serviceAccounts = await ServiceAccounts.getServiceAccountsOfType(type)
        if (!serviceAccounts) return false

        const { serviceAccountId, id: actionId, async } = await prompt(Questions.create(serviceAccounts))
        const actionExists = actionsCore.actionExists(eventId, filterId, actionId)
        let continueIfExists = !actionExists

        if (actionExists) {
          const { overrideConfirm } = await prompt(Questions.overrideAction(eventId, filterId, actionId))
          continueIfExists = overrideConfirm
        }

        if (!continueIfExists) {
          messages.info('Operation aborted, nothing changed!')
          return true
        }

        return actionQuestions(
          actionConfig,
          { id: actionId, eventId, filterId, type, action, serviceAccountId, async },
        )
      } catch (e) {
        // console.log(e)
        return false
      }
    })
}

export default {
  addAction,
}
