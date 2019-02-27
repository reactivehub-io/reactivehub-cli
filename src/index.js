#!/usr/bin/env node
import chalk from 'chalk'
import event from './commands/event'
import filter from './commands/filter'
import actions from './commands/actions'
import triggers from './commands/triggers'
import login from './commands/login'
import logout from './commands/logout'
import deploy from './commands/deploy'
import check from './commands/check'
import listener from './commands/listener'
import init from './commands/init'
import query from './commands/queries'
import packageJson from '../package.json'

const program = require('commander')

program
  .version(packageJson.version)
  .description('')

try {
  init(program)
  deploy(program)
  event.createEvent(program)
  filter.createFilter(program)
  actions.addAction(program)
  triggers.addActionTrigger(program)
  login.basicLogin(program)
  login.loggedStatus(program)
  logout.basicLogout(program)
  check.testAll(program)
  listener.init(program)
  query.init(program)
  program.parse(process.argv)
} catch (e) {
  console.log(chalk.red('Error processing your request'), e)
}
