import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
  {
    type: 'input',
    name: 'jiraProjectId',
    message: 'Enter the JIRA project ID or Key (wildcards allowed): ',
  },
]

const CREATE_PROJECT = {
  name: 'CREATE_PROJECT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_PROJECT', ...action }),
  buildTemplate: (answers = {}) => {
    const { project: payload } = template
    return {
      ...answers,
      payload,
    }
  },
  questions: () => {},
}

const UPDATE_PROJECT = {
  name: 'UPDATE_PROJECT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE_PROJECT', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
    payload: template.project,
  }),
  questions,
}

const DELETE_PROJECT = {
  name: 'DELETE_PROJECT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_PROJECT', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions,
}

const SET_PROJECT_PROPERTY = {
  name: 'SET_PROJECT_PROPERTY',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'SET_PROJECT_PROPERTY', ...action }),
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

const DELETE_PROJECT_PROPERTY = {
  name: 'DELETE_PROJECT_PROPERTY',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_PROJECT_PROPERTY', ...action }),
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
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  SET_PROJECT_PROPERTY,
  DELETE_PROJECT_PROPERTY,
}
