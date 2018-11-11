import deploy from '../core/deploy'

const deployAll = (program) => {
  program
    .command('deploy')
    .description('Deploy application')
    .action(() => {
      deploy()
    })
}

export default {
  deployAll,
}
