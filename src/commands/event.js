import prompt from '../libs/inquirer'
import { create } from './questions/event'
import event from '../core/event'
import config from '../core/config'

const createEvent = (program) => {
  program
    .command('add:event')
    .description('Add a new event')
    .action(() => {
      config.getConfigurationFile()
      prompt(create)
        .then(answers => event.createFile(answers, { withExample: true }))
    })
}

export default {
  createEvent,
}
