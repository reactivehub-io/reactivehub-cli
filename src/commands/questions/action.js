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
    message: 'Enter the action id ...',
    validate: input => idPatternValidator(input),
  },
  {
    type: 'confirm',
    name: 'async',
    message: 'Is this an asynchronous action?',
  },
]

const overrideAction = (eventId, filterId, actionId) => [
  {
    type: 'confirm',
    name: 'overrideConfirm',
    message: `Action "${actionId}" already exists on "${eventId}:${filterId}", override?`,
    default: false,
  },
]

const chooseActionOperation = (type, choices) => [
  {
    type: 'list',
    name: 'operation',
    message: `Choose the ${type} operation...`,
    default: false,
    choices,
  },
]


export default {
  create,
  overrideAction,
  chooseActionOperation,
}
