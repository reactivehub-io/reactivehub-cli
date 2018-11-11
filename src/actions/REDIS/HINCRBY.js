import { sendAction } from '../../services/api'

export default {
  name: 'HINCRBY',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'HINCRBY', ...action }),
  buildTemplate: () => ({
    key: 'the-redis-key-to-increment',
    field: 'the-redis-field-to-increment',
    value: 1,
  }),
}
