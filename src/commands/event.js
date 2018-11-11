import prompt from '../libs/inquirer'
import { create } from './questions/event'
import event from '../core/event'

const createEvent = (program) => {
  program
    .command('add:event')
    .description('Add a New Event')
    .action(() => {
      prompt(create)
        .then(answers => event.createFile(answers, { withExample: true }))
    })
}

export default {
  createEvent,
}
