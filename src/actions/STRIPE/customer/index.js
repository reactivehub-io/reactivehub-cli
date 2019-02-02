import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
]

const CREATE_CUSTOMER = {
  name: 'CREATE_CUSTOMER',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_CUSTOMER', ...action }),
  buildTemplate: () => template,
  questions,
}

const UPDATE_CUSTOMER = {
  name: 'UPDATE_CUSTOMER',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE_CUSTOMER', ...action }),
  buildTemplate: () => ({
    customerId: 'set the stripe customer id (use wildcards)',
    payload: template,
  }),
  questions: () => [],
}

const DELETE_CUSTOMER = {
  name: 'DELETE_CUSTOMER',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_CUSTOMER', ...action }),
  buildTemplate: () => ({
    customerId: 'set the stripe customer id (use wildcards)',
  }),
  questions: () => [],
}

export default {
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
}
