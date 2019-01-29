import deploy from '../core/deploy'
import config from '../core/config'

export default (program) => {
  program
    .command('deploy')
    .description('Deploy application')
    .action(() => {
      config.getConfigurationFile()
      deploy.deployAll()
    })
  program
    .command('deploy:event')
    .description('Deploy application')
    .action(() => {
      config.getConfigurationFile()
      deploy.deployEvents()
    })
  program
    .command('deploy:listener')
    .description('Deploy application')
    .action(() => {
      config.getConfigurationFile()
      deploy.deployListener()
    })
  program
    .command('deploy:query')
    .description('Deploy application')
    .action(() => {
      config.getConfigurationFile()
      deploy.deployQuery()
    })
}
