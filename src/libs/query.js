import { flatten } from 'flat'

const QueryOperators = {
  EQUALS: '=',
  NOT_EQUALS: '!=',
  LIKE: 'LIKE',
  IN: 'IN',
  GT: '>',
  GTE: '>=',
  LT: '<',
  LTE: '<=',
}

const TypeFilterOps = {
  STRING: {
    operators: [QueryOperators.EQUALS, QueryOperators.NOT_EQUALS, QueryOperators.LIKE, QueryOperators.IN],
  },
  NUMBER: {
    operators: [
      QueryOperators.EQUALS,
      QueryOperators.NOT_EQUALS,
      QueryOperators.GT,
      QueryOperators.GTE,
      QueryOperators.LT,
      QueryOperators.LTE,
      QueryOperators.IN],
  },
  DATE: [
    QueryOperators.EQUALS,
    QueryOperators.NOT_EQUALS,
    QueryOperators.GT,
    QueryOperators.GTE,
    QueryOperators.LT,
    QueryOperators.LTE,
    QueryOperators.IN],
  BOOLEAN: [
    QueryOperators.EQUALS,
    QueryOperators.NOT_EQUALS,
  ],
  ARRAY: [
    QueryOperators.IN,
  ],
  OBJECT: [
    QueryOperators.EQUALS,
  ],
}

const checkPropertyTypes = (model = {}) => {
  let status = true
  let messages = []
  if (model && Object.keys(model).length > 0) {
    const flatModel = flatten(model, { maxDepth: null })
    messages = Object.keys(flatModel)
      .map((key) => {
        const value = String(flatModel[key])
        if (TypeFilterOps[value.toUpperCase()]) return false
        return `${key}: ${value} type not allowed.`
      }).filter(item => item)
    status = messages.length === 0
  }
  return { status, messages }
}

const checkQuery = (condition) => {
  const split = condition.split('AND')
  const messages = []
  let status = true

  split.forEach((query) => {
    const hasOr = query.match(/(OR|or)/g)
    const hasAllowedOperator = query.match(/(=|!=|<>|<|<=|>|>=|IN|LIKE)/g)

    if (hasOr) {
      status = false
      messages.push('OR in query condition is not allowed.')
    }
    if (!hasAllowedOperator) {
      status = false
      messages.push(`Valid operators not found on condition "${query}" (Allowed operators: =, !=, <>, <, <=, >, >=, IN, LIKE).`)
    }
  })

  return { status, messages }
}

export default {
  checkPropertyTypes,
  checkQuery,
}
