import template from './template'
import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'fileId',
    message: 'Enter the Mailchimp FILE ID (wildcards allowed): ',
  },
]


export default {
  CREATE_FILE: {
    name: 'create-file',
    processor: 'CREATE_FILE',
    buildTemplate: () => ({ payload: template.file }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_FILE', ...action }),
    questions: () => {},
  },
  EDIT_FILE: {
    name: 'edit-file',
    processor: 'EDIT_FILE',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.edit_file }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'EDIT_FILE', ...action }),
    questions,
  },
  DELETE_FILE: {
    name: 'delete-file',
    processor: 'DELETE_FILE',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_FILE', ...action }),
    questions,
  },
}
