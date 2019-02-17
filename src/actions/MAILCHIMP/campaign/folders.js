import template from './template'
import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'folderId',
    message: 'Enter the Mailchimp CAMPAIGN FOLDER ID (wildcards allowed): ',
  },
]


export default {
  CREATE_CAMPAIGN_FOLDER: {
    name: 'create-campaign-folder',
    processor: 'CREATE_CAMPAIGN_FOLDER',
    buildTemplate: () => ({ payload: template.folder }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_CAMPAIGN_FOLDER', ...action }),
    questions: () => {},
  },
  EDIT_CAMPAIGN_FOLDER: {
    name: 'edit-campaign-folder',
    processor: 'EDIT_CAMPAIGN_FOLDER',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.folder }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'EDIT_CAMPAIGN_FOLDER', ...action }),
    questions,
  },
  DELETE_CAMPAIGN_FOLDER: {
    name: 'delete-campaign-folder',
    processor: 'DELETE_CAMPAIGN_FOLDER',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_CAMPAIGN_FOLDER', ...action }),
    questions,
  },
}
