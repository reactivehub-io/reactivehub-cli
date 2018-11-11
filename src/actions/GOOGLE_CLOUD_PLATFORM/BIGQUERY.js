import { sendAction } from '../../services/api'

export default {
  name: 'BIGQUERY',
  deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'BIG_QUERY', ...action }),
  buildTemplate: (answers = {}, eventModel = {}) => ({
    ...answers,
    schema: eventModel,
  }),
  questions: () => [
    {
      type: 'input',
      name: 'dataset',
      message: 'Enter the DATASET name...',
    },
    {
      type: 'input',
      name: 'table',
      message: 'Enter the dataset TABLE name...',
    },
  ],
}

