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
  CREATE_SIGNUP_FORM: {
    name: 'create-signup-form',
    processor: 'CREATE_SIGNUP_FORM',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.signupForm }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_SIGNUP_FORM', ...action }),
    questions,
  },
}
