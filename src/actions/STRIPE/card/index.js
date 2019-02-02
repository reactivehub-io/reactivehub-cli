import promptQuestions from './questions'
import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
  promptQuestions.usingToken,
  promptQuestions.overrideDefault,
]

const CREATE_CARD = {
  name: 'CREATE_CARD_SOURCE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_CARD_SOURCE', ...action }),
  buildTemplate: (answers = {}) => {
    const { usingToken, overrideDefault } = answers
    return {
      overrideDefault,
      customerId: 'set the stripe customer id (use wildcards)',
      payload: usingToken ? template.withSource : template.withoutSource,
    }
  },
  questions,
}

const UPDATE_CARD = {
  name: 'UPDATE_CARD',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE_CARD', ...action }),
  buildTemplate: (answers = {}) => {
    const { usingToken, overrideDefault } = answers
    return {
      overrideDefault,
      customerId: 'set the stripe customer id (use wildcards)',
      cardId: 'set the stripe card id (use wildcards)',
      payload: usingToken ? template.withSource : template.withoutSource,
    }
  },
  questions,
}

const DELETE_CARD = {
  name: 'DELETE_CARD',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_CARD', ...action }),
  buildTemplate: () => ({
    customerId: 'set the stripe customer id (use wildcards)',
    cardId: 'set the stripe card id (use wildcards)',
  }),
  questions: () => ([]),
}

export default {
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
}
