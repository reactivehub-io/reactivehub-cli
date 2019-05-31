import { sendAction } from '../../services/api'

const hookEvents = [
  { id: '*' },
  { id: 'added' },
  { id: 'updated' },
  { id: 'merged' },
  { id: 'deleted' },
]

const hookObjects = [
  { id: '*' },
  { id: 'activity' },
  { id: 'activityType' },
  { id: 'deal' },
  { id: 'note' },
  { id: 'organization' },
  { id: 'person' },
  { id: 'pipeline' },
  { id: 'product' },
  { id: 'stage' },
  { id: 'user' },
]

const filterMatchInput = (input, inputList) => inputList
  .filter(({ id = '', name = '' }) => (id.match(input) || name.match(input) || !input))
  .map(({ id }) => id)

const questions = [
  {
    type: 'autocomplete',
    name: 'event_action',
    message: 'Select the event action!',
    source: async (answersSoFar, input) => filterMatchInput(input, hookEvents),
  },
  {
    type: 'autocomplete',
    name: 'event_object',
    message: 'Select the event object!',
    source: async (answersSoFar, input) => filterMatchInput(input, hookObjects),
  },
  {
    type: 'input',
    name: 'subscription_url',
    message: 'Destination URL:',
  },
]

const LIST_WEBHOOKS = {
  name: 'LIST_WEBHOOKS',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'LIST_WEBHOOKS', ...action }),
  buildTemplate: () => ({}),
  questions: () => [
  ],
}

const CREATE_WEBHOOK = {
  name: 'CREATE_WEBHOOK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_WEBHOOK', ...action }),
  buildTemplate: (answers = {}) => ({
    ...answers,
  }),
  questions: () => questions,
}

const DELETE_WEBHOOK = {
  name: 'DELETE_WEBHOOK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_WEBHOOK', ...action }),
  buildTemplate: () => ({
    id: 'String',
  }),
  questions: () => null,
}

export default {
  LIST_WEBHOOKS,
  CREATE_WEBHOOK,
  DELETE_WEBHOOK,
}
