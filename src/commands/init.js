import message from '../messages'
import config from '../core/config'

export default (program) => {
  program
    .command('init')
    .description('Init configuration files')
    .action(async () => {
      const exists = config.existsRC()
      if (exists) message.info('.rhubrc already exists!')
      if (!exists) {
        const created = config.createRhubRC()
        if (created) message.success(`${process.cwd()}/.rhubrc created!`)
      }
    })
}
