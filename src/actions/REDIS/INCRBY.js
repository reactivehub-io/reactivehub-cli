import { sendAction } from '../../services/api'

export default {
  name: 'INCRBY',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'INCRBY', ...action }),
  buildTemplate: () => ({
    key: 'the-redis-key-to-increment',
    value: 1,
  }),
}
