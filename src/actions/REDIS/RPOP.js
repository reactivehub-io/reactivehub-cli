import { sendAction } from '../../services/api'

export default {
  name: 'RPOP',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'RPOP', ...action }),
  buildTemplate: () => ({
    key: 'the-redis-key-to-delete',
  }),
}
