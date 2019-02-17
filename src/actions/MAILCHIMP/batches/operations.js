import template from './template'
import { sendAction } from '../../../services/api'

export default {
  CREATE_BATCH_OPERATION: {
    name: 'create-batch-operation',
    processor: 'CREATE_BATCH_OPERATION',
    buildTemplate: () => ({ payload: template.batch_ops }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_BATCH_OPERATION', ...action }),
    questions: () => {},
  },
}
