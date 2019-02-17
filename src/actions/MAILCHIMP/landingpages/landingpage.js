import template from './template'
import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'pageId',
    message: 'Enter the Mailchimp LANDING PAGE ID (wildcards allowed): ',
  },
]


export default {
  CREATE_LANDING_PAGE: {
    name: 'create-landing-page',
    processor: 'CREATE_LANDING_PAGE',
    buildTemplate: () => ({ payload: template.page }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_LANDING_PAGE', ...action }),
    questions: () => {},
  },
  EDIT_LANDING_PAGE: {
    name: 'edit-landing-page',
    processor: 'EDIT_LANDING_PAGE',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.page }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'EDIT_LANDING_PAGE', ...action }),
    questions,
  },
  DELETE_LANDING_PAGE: {
    name: 'delete-landing-page',
    processor: 'DELETE_LANDING_PAGE',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_LANDING_PAGE', ...action }),
    questions,
  },
  PUBLISH_LANDING_PAGE: {
    name: 'publish-landing-page',
    processor: 'PUBLISH_LANDING_PAGE',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'PUBLISH_LANDING_PAGE', ...action }),
    questions,
  },
  UNPUBLISH_LANDING_PAGE: {
    name: 'unpublish-landing-page',
    processor: 'UNPUBLISH_LANDING_PAGE',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UNPUBLISH_LANDING_PAGE', ...action }),
    questions,
  },
}
