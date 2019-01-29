
import prompt from '../libs/inquirer'
import auth from '../core/auth'
import questions from './questions/logout'

const basicLogout = (program) => {
  program
    .command('logout')
    .description('Log out from Reactivehub')
    .action(async () => {
      const { logout } = await prompt(questions.logoutQuestions)

      if (logout) {
        auth.logoffHandler()
        return true
      }
      return false
    })
}

export default {
  basicLogout,
}
