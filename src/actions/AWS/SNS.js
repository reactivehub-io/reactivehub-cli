import { sendAction } from '../../services/api'

const messageType = {
  type: 'list',
  name: 'MessageType',
  message: 'How you wish to publish your message?',
  choices: ['Topic', 'Target', 'SMS'],
}

const messageStructure = {
  type: 'list',
  name: 'MessageStructure',
  message: 'How you wish to publish your message?',
  choices: ['json', 'string'],
}

const bodyByType = {
  Topic: {
    TopicArn: '',
  },
  Target: {
    TargetArn: '',
  },
  SMS: {
    PhoneNumber: '',
  },
}

const messageByStructure = {
  json: {
    default: '##### Type the message content. #####',
  },
  string: '##### Type the message content. #####',
}

export default {
  name: 'SNS',
  actions: [
    {
      name: 'Publish Message',
      processor: 'SNS_PUBLISH_MESSAGE',
      deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'SNS_PUBLISH_MESSAGE', ...action }),
      buildTemplate: (answers = {}) => {
        const { MessageType, MessageStructure } = answers
        const Message = messageByStructure[MessageStructure]
        const snsPayload = {
          ...bodyByType[MessageType],
          Message,
          Subject: '',
          MessageAttributes: {},
        }
        if (MessageStructure === 'json') snsPayload.MessageStructure = MessageStructure

        return snsPayload
      },
      questions: () => [messageType, messageStructure],
    },
  ],
}
