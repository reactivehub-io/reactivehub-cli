import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
]

const CREATE_SUBSCRIPTION = {
  name: 'CREATE_SUBSCRIPTION',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_SUBSCRIPTION', ...action }),
  buildTemplate: () => template,
  questions,
}

const UPDATE_SUBSCRIPTION = {
  name: 'UPDATE_SUBSCRIPTION',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE_SUBSCRIPTION', ...action }),
  buildTemplate: () => ({
    subscriptionId: 'set the stripe subscription id (use wildcards)',
    payload: template,
  }),
  questions: () => [],
}

const DELETE_SUBSCRIPTION = {
  name: 'DELETE_SUBSCRIPTION',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_SUBSCRIPTION', ...action }),
  buildTemplate: () => ({
    subscriptionId: 'set the stripe subscription id (use wildcards)',
  }),
  questions: () => [],
}

export default {
  CREATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
}
