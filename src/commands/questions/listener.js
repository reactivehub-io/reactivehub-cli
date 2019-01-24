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
      .filter(({ name = '' }) => (name.match(input)))
      .map(({ name }) => name),
  },
]

const addTrigger = [
  {
    type: 'confirm',
    name: 'addTrigger',
    message: 'Would you like to add events to trigger?',
  },
]

const confirmTriggeredEvents = [
  {
    type: 'confirm',
    name: 'eventConfirm',
    message: 'Important! Only deployed events can be attached to listeners! Confirm?',
  },
]

export default {
  create,
  addTrigger,
  confirmTriggeredEvents,
}
