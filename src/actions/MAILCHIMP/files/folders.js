import template from './template'
import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'folderId',
    message: 'Enter the Mailchimp FILE FOLDER ID (wildcards allowed): ',
  },
]


export default {
  CREATE_FILE_FOLDER: {
    name: 'create-file-folder',
    processor: 'CREATE_FILE_FOLDER',
    buildTemplate: () => ({ payload: template.folder }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_FILE_FOLDER', ...action }),
    questions: () => {},
  },
  EDIT_FILE_FOLDER: {
    name: 'edit-file-folder',
    processor: 'EDIT_FILE_FOLDER',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.folder }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'EDIT_FILE_FOLDER', ...action }),
    questions,
  },
  DELETE_FILE_FOLDER: {
    name: 'delete-file-folder',
    processor: 'DELETE_FILE_FOLDER',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_FILE_FOLDER', ...action }),
    questions,
  },
}
