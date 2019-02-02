import promptQuestions from './questions'
import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
  promptQuestions.capture,
]

const CREATE_CHARGE = {
  name: 'CREATE_CHARGE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_CHARGE', ...action }),
  buildTemplate: (answers = {}) => {
    const { capture } = answers
    return {
      capture,
      payload: template,
    }
  },
  questions,
}

const CAPTURE_CHARGE = {
  name: 'CAPTURE_CHARGE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CAPTURE_CHARGE', ...action }),
  buildTemplate: () => ({
    chargeId: 'set the stripe charge id (use wildcards)',
    amount: 'set the amount to capture (use wildcards)',
  }),
  questions: () => [],
}

export default {
  CREATE_CHARGE,
  CAPTURE_CHARGE,
}
