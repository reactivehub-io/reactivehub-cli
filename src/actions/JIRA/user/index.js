import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
  {
    type: 'input',
    name: 'jiraUserId',
    message: 'Enter the JIRA user ID (wildcards allowed): ',
  },
]

const CREATE_USER = {
  name: 'CREATE_USER',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_USER', ...action }),
  buildTemplate: (answers = {}) => {
    const { project: payload } = template
    return {
      ...answers,
      payload,
    }
  },
  questions: () => {},
}

const DELETE_USER = {
  name: 'DELETE_USER',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_USER', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions,
}

const SET_USER_PROPERTY = {
  name: 'SET_USER_PROPERTY',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'SET_USER_PROPERTY', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
    payload: template.property,
  }),
  questions: questions().concat([{
    type: 'input',
    name: 'jiraPropertyKey',
    message: 'Enter the JIRA property key (wildcards allowed): ',
  }]),
}

const DELETE_USER_PROPERTY = {
  name: 'DELETE_USER_PROPERTY',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_USER_PROPERTY', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions: questions().concat([{
    type: 'input',
    name: 'jiraPropertyKey',
    message: 'Enter the JIRA property key (wildcards allowed): ',
  }]),
}

export default {
  CREATE_USER,
  DELETE_USER,
  SET_USER_PROPERTY,
  DELETE_USER_PROPERTY,
}
