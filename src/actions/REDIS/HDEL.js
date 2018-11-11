import { sendAction } from '../../services/api'

export default {
  name: 'HDEL',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'HDEL', ...action }),
  buildTemplate: () => ({
    key: 'the-redis-key-to-delete',
    field: 'the-hashset-field-to-delete',
  }),
}
