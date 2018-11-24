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

const msgcontent = '##### Type the message content. #####'

const messageByStructure = eventModel => ({
  json: {
    default: msgcontent,
    APNS: {
      aps: {},
    },
    FCM: {
      data: {
        message: msgcontent,
        url: '',
      },
    },
    ADM: {
      data: {
        message: msgcontent,
        url: '',
      },
    },
  },
  string: msgcontent,
})

export default {
  name: 'SNS',
  actions: [
    {
      name: 'Publish Message',
      processor: 'SNS_PUBLISH_MESSAGE',
      deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'SNS_PUBLISH_MESSAGE', ...action }),
      buildTemplate: (answers = {}, eventModel = {}) => {
        const { MessageType, MessageStructure } = answers
        const Message = messageByStructure(eventModel)[MessageStructure]
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
