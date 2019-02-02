const usingToken = {
  type: 'confirm',
  name: 'usingToken',
  message: 'Are you using a card token?',
}

const overrideDefault = {
  type: 'confirm',
  name: 'overrideDefault',
  message: 'Set this card as the customer default payment method?',
}

const customerId = {
  type: 'input',
  name: 'customerId',
  message: 'Past the customer id to attach the card source (wildcards allowed).',
}

export default {
  usingToken,
  customerId,
  overrideDefault,
}
