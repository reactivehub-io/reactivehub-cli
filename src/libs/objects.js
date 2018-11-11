import { flatten } from 'flat'

const getKeySuggestions = (payload, term) => {
  const flatPayload = flatten(payload, { maxDepth: null, safe: true })
  const suggestions = []
  const otherFields = []
  Object.keys(flatPayload).forEach((key) => {
    if (key.match(term)) {
      suggestions.push(key)
    } else {
      otherFields.push(key)
    }
  })
  return {
    suggestions,
    otherFields,
  }
}

const modelToPayloadValue = eventModel => flatten(eventModel, { safe: false, maxDepth: null, delimiter: '_' })

const checkRequired = (eventPayload, required, prefix = '') => {
  const messages = required.map((key) => {
    const value = eventPayload[key]
    if ((value && value !== '')) {
      return false
    }
    return `${prefix}Required property "${key}" missing on YAML.`
  })
    .filter(key => key)
  return { status: messages.length === 0, messages }
}

export default {
  getKeySuggestions,
  modelToPayloadValue,
  checkRequired,
}
