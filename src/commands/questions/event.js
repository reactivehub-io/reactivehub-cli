import { idPatternValidator } from '../../validators'

const create = [
  {
    type: 'input',
    name: 'id',
    message: 'Enter the event id ...',
    validate: input => idPatternValidator(input),
  },
  {
    type: 'input',
    name: 'eventGroup',
    message: 'Enter the event group name ...',
    validate: input => idPatternValidator(input),
  },
]

module.exports = {
  create,
}
