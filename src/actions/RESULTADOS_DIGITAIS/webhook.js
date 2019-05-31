import { sendAction } from '../../services/api'

const hookTypes = [{
  id: 'WEBHOOK.CONVERTED',
}, {
  id: 'WEBHOOK.MARKED_OPPORTUNITY',
}]

const LIST_WEBHOOKS = {
  name: 'LIST_WEBHOOKS',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'LIST_WEBHOOKS', ...action }),
  buildTemplate: () => ({}),
  questions: () => [
  ],
}

const template = {
  entity_type: 'CONTACT',
  http_method: 'POST',
  include_relations: ['COMPANY', 'CONTACT_FUNNEL'],
}

const questions = [
  {
    type: 'autocomplete',
    name: 'event_type',
    message: 'Select the event type?',
    source: async (answersSoFar, input) => hookTypes
      .filter(({ id = '', name = '' }) => (id.match(input) || name.match(input) || !input))
      .map(({ id }) => id),
  },
  {
    type: 'input',
    name: 'url',
    message: 'Destination URL:',
  },
]

const CREATE_WEBHOOK = {
  name: 'CREATE_WEBHOOK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_WEBHOOK', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
    ...template,
  }),
  questions: () => questions,
}

const UPDATE_WEBHOOK = {
  name: 'UPDATE_WEBHOOK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UPDATE_WEBHOOK', ...action }),
  buildTemplate: (answers = {}) => ({
    uuid: 'String',
    ...answers,
    ...template,
  }),
  questions: () => questions,
}

const DELETE_WEBHOOK = {
  name: 'DELETE_WEBHOOK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_WEBHOOK', ...action }),
  buildTemplate: () => ({
    uuid: 'String',
  }),
  questions: () => null,
}


export default {
  LIST_WEBHOOKS,
  CREATE_WEBHOOK,
  UPDATE_WEBHOOK,
  DELETE_WEBHOOK,
}
