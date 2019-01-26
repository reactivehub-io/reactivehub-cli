import deploy from '../core/deploy'

const deployAll = (program) => {
  program
    .command('deploy')
    .description('Deploy application')
    .action(() => {
      deploy.deployAll()
    })
}

const deployListeners = (program) => {
  program
    .command('deploy:listener')
    .description('Deploy application')
    .action(() => {
      deploy.deployListener()
    })
}

export default (program) => {
  deployAll(program)
  deployListeners(program)
}
