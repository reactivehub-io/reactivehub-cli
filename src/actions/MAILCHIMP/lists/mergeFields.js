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
  CREATE_MERGE_FIELD: {
    name: 'create-merge-field',
    processor: 'CREATE_MERGE_FIELD',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.mergeField }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_MERGE_FIELD', ...action }),
    questions,
  },
  EDIT_MERGE_FIELD: {
    name: 'edit-merge-field',
    processor: 'EDIT_MERGE_FIELD',
    buildTemplate: (answers = {}) => ({
      ...answers,
      payload: template.mergeField,
    }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'EDIT_MERGE_FIELD', ...action }),
    questions: () => questions().concat([{
      type: 'input',
      name: 'mergeId',
      message: 'Enter the Merge ID (wildcards allowed): ',
    }]),
  },
  DELETE_MERGE_FIELD: {
    name: 'delete-merge-field',
    processor: 'DELETE_MERGE_FIELD',
    buildTemplate: (answers = {}) => ({
      ...answers,
    }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_MERGE_FIELD', ...action }),
    questions: () => questions().concat([{
      type: 'input',
      name: 'mergeId',
      message: 'Enter the Merge ID (wildcards allowed): ',
    }]),
  },
}
