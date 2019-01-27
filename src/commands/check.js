import { run } from '../core/eventCheck/check'
import config from '../core/config'

const testAll = (program) => {
  program
    .command('test')
    .description('Check event payload')
    .action(async () => {
      config.getConfigurationFile()
      return run()
    })
}

export default {
  testAll,
}
