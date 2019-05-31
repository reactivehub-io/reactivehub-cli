import { sendAction } from '../../services/api'

const LIST_PIPELINES = {
  name: 'LIST_PIPELINES',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'LIST_PIPELINES', ...action }),
  buildTemplate: () => ({
  }),
  questions: () => [],
}

export default {
  LIST_PIPELINES,
}
