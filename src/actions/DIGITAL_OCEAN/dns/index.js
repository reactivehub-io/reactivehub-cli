import { sendAction } from '../../../services/api'
import template from './template'
import usageQuestions from './questions'

const questions = () => [
]

const CREATE_DOMAIN_RECORD = {
  name: 'CREATE_DOMAIN_RECORD',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_DOMAIN_RECORD', ...action }),
  buildTemplate: (answers = {}) => template,
  questions,
}

export default {
  CREATE_USAGE_RECORD,
}
