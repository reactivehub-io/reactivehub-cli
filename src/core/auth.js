import opn from 'opn'
import config from '../libs/configstore'
import messages from '../messages'
import { issueToken, sendLoginCommand } from '../services/api'

const setAuthToken = token => config.set('rhub-auth-token', token)
const setNamespace = namespace => config.set('namespace', namespace)
const setEmail = email => config.set('email', email)
const setLogged = isLogged => config.set('isLogged', isLogged)

const getAuthToken = () => config.get('rhub-auth-token')
const getNamespace = () => config.get('namespace')
const getEmail = () => config.get('email')
const getLogged = () => config.get('isLogged')


const authStatus = () => {
  const namespace = getNamespace()
  const email = getEmail()
  const isLogged = getLogged()
  if (isLogged) {
    messages.info(`Logged in at ${namespace} as ${email}.`)
    return true
  }
  messages.info("You're not logged in")
  return false
}

const logoffHandler = async () => {
  const isLogged = getLogged()

  if (isLogged) {
    config.clear()
    messages.info("You've logged off")
    return true
  }

  messages.info("You're not logged in")
  return false
}

const sendLoginEvent = async ({ namespace, code, email, token, retry = 0 }) =>
  sendLoginCommand({ namespace, code, email, token })
    .catch(() => {
      const newRetry = retry + 1
      if (newRetry <= 5) return sendLoginEvent({ namespace, code, email, token, retry: newRetry })
      return false
    })

const authHandler = async ({ code, email, namespace } = {}) => {
  const { token, message } = await issueToken({ code, namespace, email })
  if (message) {
    messages.error(message)
    return false
  }
  setAuthToken(token)
  setNamespace(namespace)
  setEmail(email)
  setLogged(true)
  authStatus()
  await sendLoginEvent({ namespace, code, email, token })
  return true
}

const openAuth = () => opn('http://localhost:7000')

export default {
  getAuthToken,
  authHandler,
  getNamespace,
  openAuth,
  authStatus,
  logoffHandler,
  getEmail,
}
