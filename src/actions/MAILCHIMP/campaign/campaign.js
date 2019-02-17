import template from './template'
import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'campaignId',
    message: 'Enter the Mailchimp CAMPAIGN ID (wildcards allowed): ',
  },
]


export default {
  CREATE_CAMPAIGN: {
    name: 'create-campaign',
    processor: 'CREATE_CAMPAIGN',
    buildTemplate: () => ({ payload: template.campaign }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_CAMPAIGN', ...action }),
    questions: () => {},
  },
  EDIT_CAMPAIGN: {
    name: 'edit-campaign',
    processor: 'EDIT_CAMPAIGN',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.campaign }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'EDIT_CAMPAIGN', ...action }),
    questions,
  },
  DELETE_CAMPAIGN: {
    name: 'delete-campaign',
    processor: 'DELETE_CAMPAIGN',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_CAMPAIGN', ...action }),
    questions,
  },
}
