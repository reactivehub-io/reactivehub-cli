import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
  {
    type: 'input',
    name: 'jiraIssueId',
    message: 'Enter the JIRA issue id or key (wildcards allowed): ',
  },
]

const CREATE_ISSUE = {
  name: 'CREATE_ISSUE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_ISSUE', ...action }),
  buildTemplate: () => ({
    payload: template.issue,
  }),
  questions: () => {},
}

const CREATE_ISSUE_LINK = {
  name: 'CREATE_ISSUE_LINK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_ISSUE_LINK', ...action }),
  buildTemplate: () => ({
    payload: template.issueLink,
  }),
  questions: () => {},
}

const DELETE_ISSUE_LINK = {
  name: 'DELETE_ISSUE_LINK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_ISSUE_LINK', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions: () => ({
    type: 'input',
    name: 'jiraIssueLinkId',
    message: 'Enter the JIRA issue link id (wildcards allowed): ',
  }),
}

const UPDATE_ISSUE = {
  name: 'UPDATE_ISSUE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE_ISSUE', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
    payload: template.issue,
  }),
  questions,
}

const DELETE_ISSUE = {
  name: 'DELETE_ISSUE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_ISSUE', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions,
}

const ASSIGN_ISSUE = {
  name: 'ASSIGN_ISSUE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'ASSIGN_ISSUE', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
    payload: template.assign,
  }),
  questions,
}


const ADD_ISSUE_COMMENT = {
  name: 'ADD_ISSUE_COMMENT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'ADD_ISSUE_COMMENT', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
    payload: template.comment,
  }),
  questions,
}

const UPDATE_ISSUE_COMMENT = {
  name: 'UPDATE_ISSUE_COMMENT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE_ISSUE_COMMENT', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
    payload: template.comment,
  }),
  questions: () => questions().concat([{
    type: 'input',
    name: 'issueCommentId',
    message: 'Enter the JIRA issue comment id (wildcards allowed): ',
  }]),
}

const DELETE_ISSUE_COMMENT = {
  name: 'DELETE_ISSUE_COMMENT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_ISSUE_COMMENT', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions: () => questions().concat([{
    type: 'input',
    name: 'issueCommentId',
    message: 'Enter the JIRA issue comment id (wildcards allowed): ',
  }]),
}

const ADD_ISSUE_VOTE = {
  name: 'ADD_ISSUE_VOTE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'ADD_ISSUE_VOTE', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions,
}

const DELETE_ISSUE_VOTE = {
  name: 'DELETE_ISSUE_VOTE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_ISSUE_VOTE', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions,
}

export default {
  CREATE_ISSUE,
  UPDATE_ISSUE,
  DELETE_ISSUE,
  ASSIGN_ISSUE,
  ADD_ISSUE_COMMENT,
  UPDATE_ISSUE_COMMENT,
  DELETE_ISSUE_COMMENT,
  ADD_ISSUE_VOTE,
  DELETE_ISSUE_VOTE,
  CREATE_ISSUE_LINK,
  DELETE_ISSUE_LINK,
}
