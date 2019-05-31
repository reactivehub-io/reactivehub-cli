import { sendAction } from '../../services/api'

const LIST_PERSONS = {
  name: 'LIST_PERSONS',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'LIST_PERSONS', ...action }),
  buildTemplate: () => ({
    start: 0,
    limit: 100,
  }),
  questions: () => [
  ],
}

export default {
  LIST_PERSONS,
}
