import { sendAction } from '../../services/api'

const buildTemplate = ({ path, override } = {}, eventModel = {}) => ({
  path,
  merge: !override,
  payload: eventModel,
})

const questionPath = {
  type: 'input',
  name: 'path',
  message: 'Enter the path name EX: /path/to/my/doc (wildcards allowed)',
}

const questions = () => [
  questionPath,
  {
    type: 'input',
    name: 'override',
    message: 'Would you like to override the document content if it exists?',
  },
]

export default {
  name: 'FIRESTORE',
  actions: [
    {
      name: 'set',
      buildTemplate,
      questions,
      deploy: (action, eventInfo) => {
        const newAction = action
        const { template = {} } = newAction
        template.operation = 'set'
        newAction.template = template
        return sendAction(eventInfo, { serviceAction: 'FIRESTORE', ...newAction })
      },
    },
    {
      name: 'update',
      buildTemplate,
      questions,
      deploy: (action, eventInfo) => {
        const newAction = action
        const { template = {} } = newAction
        template.operation = 'update'
        newAction.template = template
        return sendAction(eventInfo, { serviceAction: 'FIRESTORE', ...newAction })
      },
    },
    {
      name: 'delete',
      buildTemplate: answers => answers,
      questions: () => [questionPath],
      deploy: (action, eventInfo) => {
        const newAction = action
        const { template = {} } = newAction
        template.operation = 'delete'
        newAction.template = template
        return sendAction(eventInfo, { serviceAction: 'FIRESTORE', ...newAction })
      },
    },
  ],
}
