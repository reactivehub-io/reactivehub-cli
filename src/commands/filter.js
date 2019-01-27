import prompt from '../libs/inquirer'
import { create } from './questions/filter'
import core from '../core/filter'
import config from '../core/config'

const createFilter = (program) => {
  program
    .command('add:filter')
    .description('Create a new event filter')
    .action(() => {
      config.getConfigurationFile()
      prompt(create)
        .then(answers => core.createFile(answers))
    })
}

export default {
  createFilter,
}
