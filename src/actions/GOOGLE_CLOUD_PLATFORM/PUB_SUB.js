import { sendAction } from '../../services/api'

const buildTemplate = (answers = {}, eventModel = {}) => ({
  ...answers,
  message: eventModel,
})

const questions = () => [
  {
    type: 'input',
    name: 'topic',
    message: 'Enter the TOPIC name (wildcards allowed)',
  },
]

export default {
  name: 'PUB_SUB',
  buildTemplate,
  questions,
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'PUB_SUB', ...action }),
}
