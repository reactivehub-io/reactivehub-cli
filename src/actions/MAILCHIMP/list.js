import ObjectUtils from '../../libs/objects'
import { sendAction } from '../../services/api'

const emailHolderQuestion = model => ({
  type: 'autocomplete',
  name: 'email_address',
  message: 'Which field in the event model holds the customer email?',
  source: async (answersSoFar, input = 'mail') => {
    const { suggestions, otherFields } = ObjectUtils.getKeySuggestions(model, input)
    const sourceModel = [].concat(suggestions || [], otherFields || [])
    return sourceModel
  },
})

const questions = eventModel => [
  emailHolderQuestion(eventModel),
]

const memberFields = {
  listId: 'the-mailchimp-list-id',
  merge_fields: {},
  interests: {},
  language: 'en',
  vip: false,
  location: {
    latitude: '',
    longitude: '',
  },
  tags: '',
}

const deploy = (action, eventInfo, serviceAction) => {
  const { email, status, listId, tags } = action
  const payload = {
    email,
    status,
    listId,
  }
  if (tags !== '') payload.tags = tags
  // TODO CALL DEPLOY API / TEST IF TAG IS EMPTY SET NULL
  return sendAction(eventInfo, { serviceAction, ...action })
}

export default {
  name: 'LIST',
  actions: [
    {
      name: 'add-member',
      processor: 'ADD_LIST_MEMBER',
      buildTemplate: ({ email_address: email }) => ({
        email: `{${email}}`,
        status: 'subscribed',
        ...memberFields,
      }),
      deploy: (action, eventInfo) => deploy(action, eventInfo, 'ADD_LIST_MEMBER'),
      questions,
    },
    {
      name: 'edit-member',
      processor: 'EDIT_LIST_MEMBER',
      buildTemplate: ({ email_address: email }) => ({
        email_address: `{${email}}`,
        status: '',
        ...memberFields,
      }),
      deploy: (action, eventInfo) => deploy(action, eventInfo, 'EDIT_LIST_MEMBER'),
      questions,
    },
    {
      name: 'delete-member',
      processor: 'DELETE_LIST_MEMBER',
      buildTemplate: ({ email_address: email }) => ({
        email: `{${email}}`,
        listId: 'type-the-mailchimp-list-id',
      }),
      deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'DELETE_LIST_MEMBER', ...action }),
      questions,
    },
  ],
}
