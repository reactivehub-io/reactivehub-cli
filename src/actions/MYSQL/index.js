import { flatten } from 'flat'
import { sendAction } from '../../services/api'

const databaseQuestion = {
  type: 'input',
  name: 'database',
  message: 'Enter the DATABASE name...',
}

const tableQuestion = {
  type: 'input',
  name: 'table',
  message: 'Enter the TABLE name...',
}

const hasConditionalQuestion = {
  type: 'confirm',
  name: 'hasConditional',
  message: 'Do your query has the WHERE condition?',
}

const buildTemplateWithStatement = (answers = {}, eventModel = {}, doPayload = true) => {
  const { database, table, hasConditional } = answers

  const template = {
    database,
    table,
  }

  if (hasConditional) {
    template.condition = [{
      field: 'the-field-to-check',
      operator: 'mysql-operator (> , <, >=, etc..)',
      value: 'the-value-to-check',
    }]
  }

  if (doPayload) template.payload = flatten(eventModel, { maxDepth: null, safe: false, delimiter: '_' })
  return template
}

const INSERT = {
  name: 'INSERT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'INSERT', ...action }),
  buildTemplate: (answers = {}, eventModel = {}) => ({
    ...answers,
    payload: flatten(eventModel, { safe: false, maxDepth: null, delimiter: '_' }),
  }),
  questions: () => [
    databaseQuestion,
    tableQuestion,
  ],
}

const UPDATE = {
  name: 'UPDATE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE', ...action }),
  buildTemplate: (answers, eventModel) => buildTemplateWithStatement(answers, eventModel),
  questions: () => [
    databaseQuestion,
    tableQuestion,
    hasConditionalQuestion,
  ],
}

const DELETE = {
  name: 'DELETE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE', ...action }),
  buildTemplate: (answers, eventModel) => buildTemplateWithStatement(answers, eventModel, false),
  questions: () => [
    databaseQuestion,
    tableQuestion,
    hasConditionalQuestion,
  ],
}

export default {
  INSERT,
  UPDATE,
  DELETE,
}
