import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
  {
    type: 'input',
    name: 'groupname',
    message: 'Enter the JIRA group name (wildcards allowed): ',
  },
]

const CREATE_GROUP = {
  name: 'CREATE_GROUP',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_GROUP', ...action }),
  buildTemplate: (answers = {}) => {
    const { group: payload } = template
    return {
      ...answers,
      payload,
    }
  },
  questions: () => {},
}

const DELETE_GROUP = {
  name: 'DELETE_GROUP',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_GROUP', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions,
}

const REMOVE_GROUP_USER = {
  name: 'REMOVE_GROUP_USER',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'REMOVE_GROUP_USER', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions: () => questions().concat([{
    type: 'input',
    name: 'accountId',
    message: 'Enter the JIRA user accountId id (wildcards allowed): ',
  }]),
}


const ADD_GROUP_USER = {
  name: 'ADD_GROUP_USER',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'ADD_GROUP_USER', ...action }),
  buildTemplate: (answers = {}) => {
    const { user: payload } = template
    return {
      ...answers,
      payload,
    }
  },
  questions,
}

export default {
  CREATE_GROUP,
  DELETE_GROUP,
  ADD_GROUP_USER,
  REMOVE_GROUP_USER,
}
