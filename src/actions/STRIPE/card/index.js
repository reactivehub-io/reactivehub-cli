import promptQeustions from './questions'
import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
  promptQeustions.usingToken,
  promptQeustions.customerId,
]

const CREATE_CARD = {
  name: 'CREATE_CARD_SOURCE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_CARD_SOURCE', ...action }),
  buildTemplate: (answers = {}, eventModel = {}) => {
    const { usingToken, customerId } = answers
    return {
      customerId,
      payload: usingToken ? template.withSource : template.withoutSource,
    }
  },
  questions,
}

export default {
  CREATE_CARD,
}