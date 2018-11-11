import { sendAction } from '../../services/api'

const urlQuestion = {
  type: 'input',
  name: 'url',
  message: 'Enter the slack webhook URL...',
}

const hasAttachmentsQuestion = {
  type: 'confirm',
  name: 'hasAttachments',
  message: 'Do your message has the SLACK attachment object?',
}

const attachments = [
  {
    fallback: 'Check Slack Documentation: Attaching content and links to messages - https://api.slack.com/docs/message-attachments',
    title: 'Check Slack Documentation',
    title_link: 'https://api.slack.com/docs/message-attachments',
    text: 'Attaching content and links to messages',
    image_url: 'https://a.slack-edge.com/1877/img/api/message_guidelines/Formatting_1.png',
    color: '#764FA5',
  },
]

const WEBHOOK = {
  name: 'WEBHOOK',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'INCOMING_WEBHOOK', ...action }),
  buildTemplate: (answers = {}) => {
    const { url, hasAttachments } = answers
    const template = {
      url,
      text: 'The text message',
    }
    if (hasAttachments) template.attachments = attachments
    return template
  },
  questions: () => [
    urlQuestion,
    hasAttachmentsQuestion,
  ],
}

export default {
  WEBHOOK,
}
