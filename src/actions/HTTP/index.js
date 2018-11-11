import { sendAction } from '../../services/api'

const hasAdditionalHeadersQuestion = {
  type: 'confirm',
  name: 'hasHeaders',
  message: 'Send additional request headers?',
}

const postPutTemplate = (answers = {}, eventModel = {}) => {
  const { hasHeaders = false } = answers
  const template = {
    path: '/',
  }
  if (hasHeaders) {
    template.headers = {
      headerKey: 'headerValue',
    }
  }
  template.payload = eventModel
  return template
}

const POST = {
  name: 'POST',
  processor: 'POST',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'POST', ...action }),
  buildTemplate: postPutTemplate,
  questions: () => [hasAdditionalHeadersQuestion],
}

const PUT = {
  name: 'PUT',
  processor: 'PUT',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'PUT', ...action }),
  buildTemplate: postPutTemplate,
  questions: () => [hasAdditionalHeadersQuestion],
}

const DELETE = {
  name: 'DELETE',
  processor: 'DELETE',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE', ...action }),
  buildTemplate: (answers = {}) => {
    const { hasHeaders = false } = answers
    const template = {
      path: '/',
    }
    if (hasHeaders) {
      template.headers = {
        headerKey: 'headerValue',
      }
    }
    return template
  },
}

export default {
  POST,
  PUT,
  DELETE,
}
