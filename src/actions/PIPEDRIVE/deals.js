import { sendAction } from '../../services/api'

const dealStatus = [
  { id: 'all_not_deleted' },
  { id: 'open' },
  { id: 'won' },
  { id: 'lost' },
  { id: 'deleted' },
]

const filterMatchInput = (input, inputList) => inputList
  .filter(({ id = '', name = '' }) => (id.match(input) || name.match(input) || !input))
  .map(({ id }) => id)

const questions = [
  {
    type: 'autocomplete',
    name: 'status',
    message: 'Select the deal status!',
    source: async (answersSoFar, input) => filterMatchInput(input, dealStatus),
  },
]

const LIST_DEALS = {
  name: 'LIST_DEALS',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'LIST_DEALS', ...action }),
  buildTemplate: (answers = {}) => ({
    start: 0,
    limit: 100,
    ...answers,
  }),
  questions: () => questions,
}

export default {
  LIST_DEALS,
}
