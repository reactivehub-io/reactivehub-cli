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
  CREATE_LIST: {
    name: 'create-list',
    processor: 'CREATE_LIST',
    buildTemplate: () => ({ payload: template.list }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_LIST', ...action }),
    questions: () => {},
  },
  EDIT_LIST: {
    name: 'edit-list',
    processor: 'EDIT_LIST',
    buildTemplate: (answers = {}) => ({
      ...answers,
      payload: template.list,
    }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'EDIT_LIST', ...action }),
    questions,
  },
  DELETE_LIST: {
    name: 'delete-list',
    processor: 'DELETE_LIST',
    buildTemplate: (answers = {}) => ({
      ...answers,
    }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_LIST', ...action }),
    questions,
  },
}
