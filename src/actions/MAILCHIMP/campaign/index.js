import folders from './folders'
import campaign from './campaign'
import actions from './actions'

export default {
  name: 'CAMPAIGN',
  actions: [
    folders.CREATE_CAMPAIGN_FOLDER,
    folders.EDIT_CAMPAIGN_FOLDER,
    folders.DELETE_CAMPAIGN_FOLDER,
    campaign.CREATE_CAMPAIGN,
    campaign.EDIT_CAMPAIGN,
    campaign.DELETE_CAMPAIGN,
    actions.CANCEL_CAMPAIGN_SEND,
    actions.CREATE_CAMPAIGN_RESEND,
    actions.PAUSE_CAMPAIGN_RSS,
    actions.REPLICATE_CAMPAIGN,
    actions.RESUME_CAMPAIGN,
    actions.SCHEDULE_CAMPAIGN,
    actions.SEND_CAMPAIGN,
    actions.TEST_CAMPAIGN,
    actions.UNSCHEDULE_CAMPAIGN,
  ],
}
