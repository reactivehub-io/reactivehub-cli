const baseTemplate = {
  customer: 'String',
  items: [
    { plan: 'set the stripe plan 1 id (use wildcards)::String', quantity: 'Quantity for this item::Number' },
    { plan: 'set the stripe plan 2 id (use wildcards)::String', quantity: 'Quantity for this item::Number' },
  ],
  metadata: {
    key: 'value::any',
  },
}

export default baseTemplate
