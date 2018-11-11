import axios from 'axios'
import auth from '../core/auth'
import { paths, eventTypes } from './apiConfig'

const namespace = auth.getNamespace()
/**
 * @typedef ServiceReturn
 * @property {Boolean} status
 * @property {String} message
 */
const bearer = `Bearer ${auth.getAuthToken()}`

const sendPost = async (url, payload) => {
  const headers = bearer ? { Authorization: bearer } : {}
  return axios.post(url, payload, { headers })
    .then(r => r.data)
    .catch(err => err.response.data)
}

const doGet = async (url) => {
  const headers = bearer ? { Authorization: bearer } : {}
  return axios.get(url, { headers })
    .then(r => r.data)
    .catch(err => err.response.data)
}
/**
 * @param {*} payload
 * @returns {Promise.<ServiceReturn>}
 */
export const sendEvent = async payload => sendPost(paths.event(eventTypes.NEW_EVENT), payload)

/**
 * @param {*} payload
 * @returns {Promise.<ServiceReturn>}
 */
export const sendEventFilter = async payload => sendPost(paths.event(eventTypes.NEW_EVENT_RULE), payload)

export const issueToken = async payload => sendPost(paths.cli(eventTypes.ISSUE_CLI_TOKEN), payload)
  .catch(({ message }) => message)

/**
 * @param {*} eventInfo
 * @param {*} param1
 * @returns {Promise.<ServiceReturn>}
 */
export const sendAction = async (eventInfo, { id, serviceAccountId, serviceAction, template } = {}) => {
  const payload = {
    ...eventInfo,
    action: {
      id,
      name: id,
      serviceAccountId,
      serviceAction,
      config: template,
    },
  }
  return sendPost(paths.event(eventTypes.ADD_ACTION_RULE), payload)
}

export const getServiceAccounts = (type) => {
  const params = `?namespace=${namespace}&type=${type}`
  const url = paths.namedQuery('service-accounts-by-type', params)
  return doGet(url).then(r => r.data)
}
