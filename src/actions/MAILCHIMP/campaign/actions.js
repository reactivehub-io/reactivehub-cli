import template from './template'
import { sendAction } from '../../../services/api'

const questions = () => [
  {
    type: 'input',
    name: 'campaignId',
    message: 'Enter the Mailchimp CAMPAIGN ID (wildcards allowed): ',
  },
]


export default {
  CANCEL_CAMPAIGN_SEND: {
    name: 'cancel-send',
    processor: 'CANCEL_CAMPAIGN_SEND',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CANCEL_CAMPAIGN_SEND', ...action }),
    questions,
  },
  CREATE_CAMPAIGN_RESEND: {
    name: 'create-resend',
    processor: 'CREATE_CAMPAIGN_RESEND',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_CAMPAIGN_RESEND', ...action }),
    questions,
  },
  PAUSE_CAMPAIGN_RSS: {
    name: 'pause-campaign-rss',
    processor: 'PAUSE_CAMPAIGN_RSS',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'PAUSE_CAMPAIGN_RSS', ...action }),
    questions,
  },
  REPLICATE_CAMPAIGN: {
    name: 'replicate-campaign',
    processor: 'PAUSE_CAMPAIGN_RSS',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'REPLICATE_CAMPAIGN', ...action }),
    questions,
  },
  RESUME_CAMPAIGN: {
    name: 'resume-campaign',
    processor: 'RESUME_CAMPAIGN',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'RESUME_CAMPAIGN', ...action }),
    questions,
  },
  SCHEDULE_CAMPAIGN: {
    name: 'schedule-campaign',
    processor: 'SCHEDULE_CAMPAIGN',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.schedule }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'SCHEDULE_CAMPAIGN', ...action }),
    questions,
  },
  SEND_CAMPAIGN: {
    name: 'send-campaign',
    processor: 'SEND_CAMPAIGN',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'SEND_CAMPAIGN', ...action }),
    questions,
  },
  TEST_CAMPAIGN: {
    name: 'test-campaign',
    processor: 'TEST_CAMPAIGN',
    buildTemplate: (answers = {}) => ({ ...answers, payload: template.test }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'TEST_CAMPAIGN', ...action }),
    questions,
  },
  UNSCHEDULE_CAMPAIGN: {
    name: 'unschedule-campaign',
    processor: 'UNSCHEDULE_CAMPAIGN',
    buildTemplate: (answers = {}) => ({ ...answers }),
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'UNSCHEDULE_CAMPAIGN', ...action }),
    questions,
  },
}
