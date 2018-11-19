import { sendAction } from '../../services/api'

const queueQuestion = {
  type: 'input',
  name: 'QueueUrl',
  message: 'Enter the SQS Queue URL...',
}

export default {
  name: 'SQS',
  actions: [
    {
      name: 'Publish STANDARD Queue',
      processor: 'SQS_PUBLISH_STANDARD_QUEUE',
      deploy: (action, eventInfo) => {
        const newPayload = action
        newPayload.type = typeof action.payload === 'object' ? 'JSON' : 'STRING'
        return sendAction(eventInfo, { serviceAction: 'SQS_PUBLISH_STANDARD_QUEUE', ...action })
      },
      buildTemplate: (answers = {}, eventModel = {}) => ({
        ...answers,
        MessageAttributes: null,
        DelaySeconds: 0,
        payload: eventModel,
      }),
      questions: () => [queueQuestion],
    },
    {
      name: 'Publish FIFO Queue',
      processor: 'SQS_PUBLISH_FIFO_QUEUE',
      deploy: (action, eventInfo) => {
        const newPayload = action
        newPayload.type = typeof action.payload === 'object' ? 'JSON' : 'STRING'
        return sendAction(eventInfo, { serviceAction: 'SQS_PUBLISH_FIFO_QUEUE', ...action })
      },
      buildTemplate: (answers = {}, eventModel = {}) => ({
        ...answers,
        MessageDeduplicationId: null,
        MessageGroupId: null,
        MessageAttributes: null,
        payload: eventModel,
      }),
      questions: () => [queueQuestion],
    },
  ],
}
