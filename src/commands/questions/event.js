import { idPatternValidator } from '../../validators'

const create = [
  {
    type: 'input',
    name: 'eventGroup',
    message: 'Enter the event scope (e.g payment): ',
    validate: input => idPatternValidator(input),
  },
  {
    type: 'input',
    name: 'id',
    message: 'Enter the event id (e.g new-credit-card, this will create the composed event enpoint, for example: payment.new-credit-card): ',
    validate: input => idPatternValidator(input),
  },
]

module.exports = {
  create,
}
