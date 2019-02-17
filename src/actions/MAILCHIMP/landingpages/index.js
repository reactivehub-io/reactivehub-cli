import landingpage from './landingpage'

export default {
  name: 'LANDING_PAGES',
  actions: [
    landingpage.CREATE_LANDING_PAGE,
    landingpage.EDIT_LANDING_PAGE,
    landingpage.DELETE_LANDING_PAGE,
    landingpage.PUBLISH_LANDING_PAGE,
    landingpage.UNPUBLISH_LANDING_PAGE,
  ],
}
