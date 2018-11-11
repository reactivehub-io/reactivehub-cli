import { sendAction } from '../../services/api'

export default {
  name: 'DEL',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DEL', ...action }),
  buildTemplate: () => ({
    key: 'the-redis-key-to-delete',
  }),
}
