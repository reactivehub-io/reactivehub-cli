import ops from './operations'
import webhook from './webhook'

export default {
  name: 'BATCH',
  actions: [
    ops.CREATE_BATCH_OPERATION,
    webhook.CREATE_BATCH_WEBHOOK,
  ],
}
