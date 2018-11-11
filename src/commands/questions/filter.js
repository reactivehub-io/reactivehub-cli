import { idPatternValidator } from '../../validators'
import events from '../../core/event'

const create = [
  {
    type: 'autocomplete',
    name: 'eventId',
    message: 'Select the event to apply ...',
    source: (answersSoFar, input = '') => {
      const sourceFind = async () => events.getEventsInFolder().filter(i => i.match(input))
      return sourceFind()
    },
  },
  {
    type: 'input',
    name: 'id',
    message: 'Enter the filter id ...',
    validate: input => idPatternValidator(input),
  },
  {
    type: 'input',
    name: 'name',
    message: 'Enter the filter display name ...',
  },
  {
    type: 'input',
    name: 'condition',
    message: 'Enter the query condition ...',
  },
]

module.exports = {
  create,
}
