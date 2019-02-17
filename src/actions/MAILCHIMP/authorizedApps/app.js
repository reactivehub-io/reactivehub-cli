import template from './template'
import { sendAction } from '../../../services/api'

export default {
  CREATE_AUTHORIZED_APP: {
    name: 'create-authorized-app',
    processor: 'CREATE_AUTHORIZED_APP',
    buildTemplate: () => ({ payload: template.app }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_AUTHORIZED_APP', ...action }),
    questions: () => {},
  },
}
