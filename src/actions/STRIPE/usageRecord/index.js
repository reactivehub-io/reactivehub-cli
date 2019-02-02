import { sendAction } from '../../../services/api'
import template from './template'
import usageQuestions from './questions'

const questions = () => [
  usageQuestions.action,
]

const CREATE_USAGE_RECORD = {
  name: 'CREATE_USAGE_RECORD',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_USAGE_RECORD', ...action }),
  buildTemplate: (answers = {}) => {
    const { action } = answers
    return {
      ...template,
      action,
    }
  },
  questions,
}

export default {
  CREATE_USAGE_RECORD,
}
