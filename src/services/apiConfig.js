const url = 'https://gateway.reactivehub.io'

export const paths = {
  event: event => `${url}/event/${event}`,
  cli: name => `${url}/cli/${name}`,
  namedQuery: (queryName, params = '') => `${url}/query/${queryName}${params}`,
}

export const eventTypes = {
  NEW_USER: 'new-user',
  NEW_TEAM: 'new-team',
  ADD_SUBSCRIPTION: 'add-subscription',
  NEW_SERVICE_ACCOUNT: 'new-service-account',
  NEW_EVENT: 'new-event',
  REMOVE_EVENT: 'remove-event',
  NEW_EVENT_RULE: 'new-event-rule',
  REMOVE_EVENT_RULE: 'remove-event-rule',
  ADD_ACTION_RULE: 'add-action-rule',
  NEW_CHARGE: 'new-charge',
  NEW_CREDIT_CARD: 'new-credit-card',
  LIST_EVENT_GROUPS: 'list-event-groups',
  ISSUE_TOKEN: 'request-api-token-creation',
  ADD_QUESTION: 'add-question',
  ISSUE_CLI_TOKEN: 'rhub/issue-cli-token',
}
