import { run } from '../core/eventCheck/check'

const testAll = (program) => {
  program
    .command('test')
    .description('Check event payload')
    .action(async () => run())
}

export default {
  testAll,
}
