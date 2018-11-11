import chalk from 'chalk'

const success = message => console.log(chalk.white.bold(`${chalk.green.bold('[Success!]')} ${message}`))
const error = message => console.log(chalk.white.bold(`${chalk.redBright.bold('[Error!]')} ${message}`))
const info = message => console.log(chalk.white.bold(`${chalk.cyan.bold('[Info!]')} ${message}`))

export default {
  success,
  error,
  info,
}
