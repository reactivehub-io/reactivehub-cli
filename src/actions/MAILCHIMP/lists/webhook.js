import template from './template'
import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'listId',
    message: 'Enter the Mailchimp LIST ID (wildcards allowed): ',
  },
]

export default {
  CREATE_WEBHOOK: {
    name: 'create-webhook',
    processor: 'CREATE_WEBHOOK',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.webhook }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_WEBHOOK', ...action }),
    questions,
  },
  EDIT_WEBHOOK: {
    name: 'edit-webhok',
    processor: 'EDIT_WEBHOOK',
    buildTemplate: (answers = {}) => ({
      ...answers,
      payload: template.webhook,
    }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'EDIT_WEBHOOK', ...action }),
    questions: () => questions().concat([{
      type: 'input',
      name: 'webhookId',
      message: 'Enter the WEBHOOK ID (wildcards allowed): ',
    }]),
  },
  DELETE_WEBHOOK: {
    name: 'delete-webhook',
    processor: 'DELETE_WEBHOOK',
    buildTemplate: (answers = {}) => ({
      ...answers,
    }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_WEBHOOK', ...action }),
    questions: () => questions().concat([{
      type: 'input',
      name: 'webhookId',
      message: 'Enter the WEBHOOK ID (wildcards allowed): ',
    }]),
  },
}
