import opn from 'opn'
import prompt from '../libs/inquirer'
import auth from '../core/auth'
import messages from '../messages'
import questions from './questions/login'

const authUrl = 'https://console.reactivehub.io/api-token/cli-auth'

const basicLogin = (program) => {
  program
    .command('login')
    .description('Create a new event filter')
    .action(async () => {
      const { doRedirect } = await prompt(questions.preLogin)
      if (!doRedirect) {
        messages.error('--------------------------')
        messages.error('Login aborted by the user.')
        messages.error('--------------------------')
        return false
      }

      opn(authUrl)

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
