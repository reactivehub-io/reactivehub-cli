import sites from './sites'

export default {
  name: 'SITES',
  actions: [
    sites.CREATE_CONNECTED_SITE,
    sites.DELETE_CONNECTED_SITE,
    sites.VERIFY_CONNECTED_SITE,
  ],
}
