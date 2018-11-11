import { sendAction } from '../../services/api'

export default {
  name: 'HINCRBYFLOAT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'HINCRBYFLOAT', ...action }),
  buildTemplate: () => ({
    key: 'the-redis-key-to-increment',
    field: 'the-redis-field-to-increment',
    value: 1.0,
  }),
}
