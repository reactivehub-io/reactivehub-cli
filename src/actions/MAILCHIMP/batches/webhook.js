import template from './template'
import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'webhookId',
    message: 'Enter the Mailchimp BATCH WEBHOOK ID (wildcards allowed): ',
  },
]

export default {
  CREATE_BATCH_WEBHOOK: {
    name: 'create-batch-webhook',
    processor: 'CREATE_BATCH_WEBHOOK',
    buildTemplate: () => ({ payload: template.webhook }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_BATCH_WEBHOOK', ...action }),
    questions: () => {},
  },
  EDIT_BATCH_WEBHOOK: {
    name: 'edit-batch-webhook',
    processor: 'EDIT_BATCH_WEBHOOK',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.webhook }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'EDIT_BATCH_WEBHOOK', ...action }),
    questions,
  },
  DELETE_BATCH_WEBHOOK: {
    name: 'delete-batch-webhook',
    processor: 'DELETE_BATCH_WEBHOOK',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_BATCH_WEBHOOK', ...action }),
    questions,
  },
}
