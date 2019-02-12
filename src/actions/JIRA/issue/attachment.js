import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'issueAttachmentId',
    message: 'Enter the JIRA attachment id (wildcards allowed): ',
  },
]

const DELETE_ISSUE_ATTACHMENT = {
  name: 'DELETE_ISSUE_ATTACHMENT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_ISSUE_ATTACHMENT', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions,
}

export default {
  DELETE_ISSUE_ATTACHMENT,
}
