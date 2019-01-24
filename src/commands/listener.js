import listeners from '../core/listener'

const addListener = (program) => {
  program
    .command('add:listener <type>')
    .description('Add event listener')
    .action(async (type) => listeners.addListener(type))
}

export default {
  init: (program) => {
    addListener(program)
  },
}
