import folders from './folders'

export default {
  name: 'CAMPAIGN',
  actions: [
    folders.CREATE_CAMPAIGN_FOLDER,
    folders.EDIT_CAMPAIGN_FOLDER,
    folders.DELETE_CAMPAIGN_FOLDER,
  ],
}
