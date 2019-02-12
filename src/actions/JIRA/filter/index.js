import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
  {
    type: 'input',
    name: 'jiraFilterId',
    message: 'Enter the JIRA filter id (wildcards allowed): ',
  },
]

const CREATE_FILTER = {
  name: 'CREATE_FILTER',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_FILTER', ...action }),
  buildTemplate: (answers = {}) => {
    const { filter: payload } = template
    return {
      ...answers,
      payload,
    }
  },
  questions: () => {},
}

const UPDATE_FILTER = {
  name: 'UPDATE_FILTER',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE_FILTER', ...action }),
  buildTemplate: (answers = {}) => {
    const { filter: payload } = template
    return {
      ...answers,
      payload,
    }
  },
  questions,
}

const idOnlyAction = type => ({
  name: type,
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: type, ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions,
})

const DELETE_FILTER = idOnlyAction('DELETE_FILTER')
const ADD_FAVORITE_FILTER = idOnlyAction('ADD_FAVORITE_FILTER')
const REMOVE_FAVORITE_FILTER = idOnlyAction('REMOVE_FAVORITE_FILTER')
const REMOVE_FILTER_PERMISSION = {
  name: 'REMOVE_FILTER_PERMISSION',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'REMOVE_FILTER_PERMISSION', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions: () => questions().concat([{
    type: 'input',
    name: 'jiraPermissionId',
    message: 'Enter the JIRA filter permission id (wildcards allowed): ',
  }]),
}


const ADD_FILTER_PERMISSION = {
  name: 'ADD_FILTER_PERMISSION',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'ADD_FILTER_PERMISSION', ...action }),
  buildTemplate: (answers = {}) => {
    const { share: payload } = template
    return {
      ...answers,
      payload,
    }
  },
  questions,
}

export default {
  CREATE_FILTER,
  UPDATE_FILTER,
  DELETE_FILTER,
  ADD_FAVORITE_FILTER,
  REMOVE_FAVORITE_FILTER,
  ADD_FILTER_PERMISSION,
  REMOVE_FILTER_PERMISSION,
}
