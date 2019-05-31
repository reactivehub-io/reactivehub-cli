import { sendAction } from '../../services/api'

const LIST_STAGES = {
  name: 'LIST_STAGES',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'LIST_STAGES', ...action }),
  buildTemplate: () => ({
  }),
  questions: () => [],
}

export default {
  LIST_STAGES,
}
