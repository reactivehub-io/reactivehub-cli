#!/usr/bin/env node

import event from './commands/event'
import filter from './commands/filter'
import actions from './commands/actions'
import login from './commands/login'
import deploy from './commands/deploy'
import check from './commands/check'
import listener from './commands/listener'
import init from './commands/init'

const program = require('commander')

program
  .version('1.0.0')
  .description('Contact management system')

try {
  init(program)
  deploy(program)
  event.createEvent(program)
  filter.createFilter(program)
  actions.addAction(program)
  login.basicLogin(program)
  login.loggedStatus(program)
  check.testAll(program)
  listener.init(program)
  program.parse(process.argv)
} catch (e) {
  console.log('Error processing your request', e)
}
