#!/usr/bin/env node

import event from './commands/event'
import filter from './commands/filter'
import actions from './commands/actions'
import login from './commands/login'
import deploy from './commands/deploy'
import check from './commands/check'

const program = require('commander')

program
  .version('1.0.0')
  .description('Contact management system')

event.createEvent(program)
filter.createFilter(program)
actions.addAction(program)
login.basicLogin(program)
deploy.deployAll(program)
check.testAll(program)

program.parse(process.argv)

