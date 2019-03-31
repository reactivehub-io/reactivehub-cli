
const authQuestions = [
  {
    type: 'input',
    name: 'code',
    message: 'Paste the authorization code here: ',
    validate: input => true,
  },
  {
    type: 'input',
    name: 'email',
    message: 'Your email: ',
    validate: input => true,
  },
  {
    type: 'input',
    name: 'namespace',
    message: 'Your namespace: ',
    validate: input => true,
  },
]

const preLogin = [
  {
    type: 'confirm',
    name: 'haveCode',
    message: 'Do you already have the authorization code?',
  },
]

export default {
  authQuestions,
  preLogin,
}
