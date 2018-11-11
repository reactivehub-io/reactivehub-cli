import opn from 'opn'
import config from '../libs/configstore'
import messages from '../messages'
import { issueToken } from '../services/api'

const setAuthToken = token => config.set('rhub-auth-token', token)
const setNamespace = namespace => config.set('namespace', namespace)

const getAuthToken = () => config.get('rhub-auth-token')

const getNamespace = () => config.get('namespace')

const authHandler = async ({ code, email, namespace } = {}) => {
  const { token, message } = await issueToken({ code, namespace, email })
  if (message) {
    messages.error(message)
    return false
  }
  console.log('TOKEN', token)
  setAuthToken(token)
  setNamespace(namespace)
  messages.info(`Logged at ${namespace} as ${email}.`)
  return true
}

const openAuth = () => opn('http://localhost:7000')

export default {
  getAuthToken,
  authHandler,
  getNamespace,
  openAuth,
}
