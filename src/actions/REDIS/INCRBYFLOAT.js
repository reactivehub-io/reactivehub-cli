import { sendAction } from '../../services/api'

export default {
  name: 'INCRBYFLOAT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'INCRBYFLOAT', ...action }),
  buildTemplate: () => ({
    key: 'the-redis-key-to-increment',
    value: 1.1,
  }),
}
