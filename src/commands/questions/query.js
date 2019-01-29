import { idPatternValidator } from '../../validators'

const create = serviceAccounts => [
  {
    type: 'autocomplete',
    name: 'serviceAccountId',
    message: 'Select the service account to apply ...',
    source: async (answersSoFar, input = '') => serviceAccounts
      .filter(({ id = '', name = '' }) => (id.match(input) || name.match(input)))
      .map(({ id }) => id),
  },
  {
    type: 'input',
    name: 'id',
    message: 'The query id (it will be used as the api endpoint) ...',
    validate: input => idPatternValidator(input),
  },
  {
    type: 'input',
    name: 'scope',
    message: 'The query scope (e.g payment) or leave it blank ...',
    validate: input => !input || idPatternValidator(input),
  },
]

const addTrigger = [
  {
    type: 'confirm',
    name: 'addTrigger',
    message: 'Would you like to add events to trigger?',
  },
]

const addMoreTriggers = [
  {
    type: 'confirm',
    name: 'addMoreTriggers',
    message: 'Would you like to add more events to trigger?',
  },
]

const confirmTriggeredEvents = [
  {
    type: 'confirm',
    name: 'eventConfirm',
    message: 'Important! Only deployed events can be attached to listeners! Confirm?',
  },
]

const selectEvent = events => [
  {
    type: 'autocomplete',
    name: 'eventId',
    message: 'Select the event to trigger ...',
    source: async (answersSoFar, input = '') => events
      .filter(({ id = '', name = '' }) => (id.match(input) || name.match(input)))
      .map(({ id }) => id),
  },
]

export default {
  create,
  addTrigger,
  confirmTriggeredEvents,
  selectEvent,
  addMoreTriggers,
}
