import { sendAction } from '../../services/api'

const buildTemplate = (answers = {}, eventModel = {}) => ({
  ...answers,
  payload: eventModel,
})

const questions = () => [
  {
    type: 'input',
    name: 'path',
    message: 'Enter the path name EX: /path/to/my/doc (wildcards allowed)',
  },
]

export default {
  name: 'REALTIME_DATABASE',
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
        return sendAction(eventInfo, { serviceAction: 'REALTIME_DATABASE', ...newAction })
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
        return sendAction(eventInfo, { serviceAction: 'REALTIME_DATABASE', ...newAction })
      },
    },
    {
      name: 'remove',
      buildTemplate: answers => answers,
      questions,
      deploy: (action, eventInfo) => {
        const newAction = action
        const { template = {} } = newAction
        template.operation = 'remove'
        newAction.template = template
        return sendAction(eventInfo, { serviceAction: 'REALTIME_DATABASE', ...newAction })
      },
    },
  ],
}
