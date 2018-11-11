import { sendAction } from '../../services/api'

export default {
  name: 'INCR',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'INCR', ...action }),
  buildTemplate: () => ({
    key: 'the-redis-key-to-increment',
  }),
}
