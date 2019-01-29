import queries from '../core/queries'
import config from '../core/config'

const add = (program) => {
  program
    .command('add:query <type>')
    .description('Create a query endpoint into the query API')
    .action(async (type) => {
      config.getConfigurationFile()
      return queries.add(type)
    })
}

export default {
  init: (program) => {
    add(program)
  },
}
