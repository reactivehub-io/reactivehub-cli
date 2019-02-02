import { sendAction } from '../../../services/api'
import template from './template'

const questions = () => [
]

const CREATE_SUBSCRIPTION_ITEM = {
  name: 'CREATE_SUBSCRIPTION_ITEM',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_SUBSCRIPTION_ITEM', ...action }),
  buildTemplate: () => template,
  questions,
}

const UPDATE_SUBSCRIPTION_ITEM = {
  name: 'UPDATE_SUBSCRIPTION_ITEM',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE_SUBSCRIPTION_ITEM', ...action }),
  buildTemplate: () => {
    const payload = template
    delete payload.subscription
    return {
      item: 'The identifier of the subscription item to modify::String',
      payload,
    }
  },
  questions,
}

const DELETE_SUBSCRIPTION_ITEM = {
  name: 'DELETE_SUBSCRIPTION_ITEM',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_SUBSCRIPTION_ITEM', ...action }),
  buildTemplate: () => {
    const payload = template
    delete payload.subscription
    return {
      item: 'The identifier of the subscription item to modify::String',
      payload: {
        clear_usage: 'Delete all usage for the given subscription item. Allowed only when the current plan’s usage_type is metered.::Boolean',
      },
    }
  },
  questions,
}

export default {
  CREATE_SUBSCRIPTION_ITEM,
  UPDATE_SUBSCRIPTION_ITEM,
  DELETE_SUBSCRIPTION_ITEM,
}
