const create = (serviceAccounts, availableListeners) => [
  {
    type: 'autocomplete',
    name: 'serviceAccountId',
    message: 'Select the service account to apply ...',
    source: async (answersSoFar, input = '') => serviceAccounts
      .filter(({ id = '', name = '' }) => (id.match(input) || name.match(input)))
      .map(({ id }) => id),
  },
  {
    type: 'autocomplete',
    name: 'listenerType',
    message: 'Select the listener to apply ...',
    source: async (answersSoFar, input = '') => availableListeners
      .filter(({ id = '', name = '' }) => (id.match(input) || name.match(input)))
      .map(({ id }) => id),
  },
]

export default {
  create,
}
