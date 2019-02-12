import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
  {
    type: 'input',
    name: 'jiraWebhookId',
    message: 'Enter the JIRA WEBHOOK ID (wildcards allowed): ',
  },
]

const CREATE_WEBHOOK = {
  name: 'CREATE_WEBHOOK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_WEBHOOK', ...action }),
  buildTemplate: () => {
    const { webhook: payload } = template
    return {
      payload,
    }
  },
  questions: () => {},
}

const DELETE_WEBHOOK = {
  name: 'DELETE_WEBHOOK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_WEBHOOK', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions,
}


export default {
  CREATE_WEBHOOK,
  DELETE_WEBHOOK,
}
