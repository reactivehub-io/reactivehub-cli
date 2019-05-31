import { sendAction } from '../../services/api'

const CREATE_CONVERSION = {
  name: 'CREATE_CONVERSION',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'CREATE_CONVERSION', ...action }),
  buildTemplate: () => ({
    conversion_identifier: 'String',
    name: 'String',
    email: 'String',
    job_title: 'String',
    state: 'String',
    city: 'String',
    country: 'String',
    personal_phone: 'String',
    mobile_phone: 'String',
    twitter: 'String',
    facebook: 'String',
    linkedin: 'String',
    website: 'String',
    company_name: 'String',
    company_site: 'String',
    company_address: 'String',
    client_tracking_id: 'String',
    traffic_source: null,
    traffic_medium: 'String',
    traffic_campaign: 'String',
    traffic_value: 'String',
  }),
  questions: () => [
  ],
}

export default {
  CREATE_CONVERSION,
}
