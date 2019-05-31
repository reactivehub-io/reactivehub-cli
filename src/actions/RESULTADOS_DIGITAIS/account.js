import { sendAction } from '../../services/api'

const ACCOUNT_INFO = {
  name: 'ACCOUNT_INFO',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'ACCOUNT_INFO', ...action }),
  buildTemplate: () => ({}),
  questions: () => [
  ],
}

const TRACKING_CODE = {
  name: 'TRACKING_CODE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'TRACKING_CODE', ...action }),
  buildTemplate: () => ({}),
  questions: () => [
  ],
}

export default {
  ACCOUNT_INFO,
  TRACKING_CODE,
}
