import template from './template'
import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'siteId',
    message: 'Enter the Mailchimp CAMPAIGN FOLDER ID (wildcards allowed): ',
  },
]


export default {
  CREATE_CONNECTED_SITE: {
    name: 'create-connected-site',
    processor: 'CREATE_CONNECTED_SITE',
    buildTemplate: () => ({ payload: template.site }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_CONNECTED_SITE', ...action }),
    questions: () => {},
  },
  DELETE_CONNECTED_SITE: {
    name: 'delete-connected-site',
    processor: 'DELETE_CONNECTED_SITE',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_CONNECTED_SITE', ...action }),
    questions,
  },
  VERIFY_CONNECTED_SITE: {
    name: 'verify-connected-site',
    processor: 'VERIFY_CONNECTED_SITE',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'VERIFY_CONNECTED_SITE', ...action }),
    questions,
  },
}
