import config from '../core/config'

const addListener = (program) => {
  program
    .command('add:listener <type>')
    .description('Add event listener')
    .action(async (type) => {
      config.getConfigurationFile()
      return listeners.addListener(type)
    })
}

export default {
  init: (program) => {
    addListener(program)
  },
}
