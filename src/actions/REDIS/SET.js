import redisQuestions from './questions'
import { sendAction } from '../../services/api'

const questions = () => [
  redisQuestions.shouldStringify,
]

export default {
  name: 'SET',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'SET', ...action }),
  buildTemplate: (answers = {}, eventModel = {}) => {
    const { shouldStringify } = answers
    const value = shouldStringify ? eventModel : 'the-key-value'
    return {
      key: 'the-redis-key-to-set',
      stringify: shouldStringify,
      value,
    }
  },
  questions,
}
