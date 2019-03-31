import opn from 'opn'
import prompt from '../libs/inquirer'
import auth from '../core/auth'
import messages from '../messages'
import questions from './questions/login'

const authUrl = 'https://console.reactivehub.io/cli/setup/auth'

const buildSeparatorString = s => ''.padStart(s, '-')

const basicLogin = (program) => {
  program
    .command('login')
    .description('Log in to Reactivehub')
    .action(async () => {
      const { haveCode } = await prompt(questions.preLogin)

      if (!haveCode) opn(authUrl)

      messages.info('')
      messages.info('Copy your authorization code:')
      messages.info('')
      return prompt(questions.authQuestions)
        .then(answers => auth.authHandler(answers))
    })
}

const loggedStatus = (program) => {
  program
    .command('status')
    .description('Login status')
    .action(async () => auth.authStatus())
}

export default {
  basicLogin,
  loggedStatus,
}
