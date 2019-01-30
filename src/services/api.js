import axios from 'axios'
import auth from '../core/auth'
import { paths, eventTypes } from './apiConfig'

const namespace = auth.getNamespace()
/**
 * @typedef ServiceReturn
 * @property {Boolean} status
 * @property {String} message
 */
const bearer = auth.getAuthToken() && `Bearer ${auth.getAuthToken()}`

const sendPost = async (url, payload) => {
  const headers = bearer ? { Authorization: bearer } : {}
  return axios.post(url, payload, { headers })
    .then(r => {
      return r.data
    })
    .catch((err) => {
      console.error(err.response.data)
      return err.response.data
    })
}

const doGet = async (url) => {
  const headers = bearer ? { Authorization: bearer } : {}
  return axios.get(url, { headers })
    .then(r => r.data)
    .catch((err) => {
      console.error(err.response.data)
      return err.response.data
    })
}
/**
 * @param {*} payload
 * @returns {Promise.<ServiceReturn>}
 */
export const sendEvent = async payload => sendPost(paths.event(eventTypes.NEW_EVENT), payload)

export const sendListener = async payload => sendPost(paths.event(eventTypes.NEW_LISTENER), payload)
export const sendListenerTrigger = async payload => sendPost(paths.event(eventTypes.NEW_LISTENER_TRIGGER), payload)

export const sendQuery = async payload => sendPost(paths.event(eventTypes.NAMED_QUERY), payload)

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

export const getAvailableListenerTypes = (type) => {
  const params = `?type=${type}`
  const url = paths.namedQuery('list-available-listener-types', params)
  return doGet(url).then(r => r.data)
}

export const isAvailableQuerySerivce = (type) => {
  const params = `?type=${type}`
  const url = paths.namedQuery('list-available-query-services', params)
  return doGet(url).then(({ data = [{}] }) => data.shift().type === type)
}

export const getListenerModel = (type, trigger) => {
  const params = `?type=${type}&trigger=${trigger}`
  const url = paths.namedQuery('get-listener-model', params)
  return doGet(url).then(r => r.data.shift().model)
}

export const getEventIds = () => {
  const params = `?namespace=${namespace}`
  const url = paths.namedQuery('list-event-ids', params)
  return doGet(url).then(({ data = [] }) => ((data.length > 0 && data) || null))
}

export const getEventModel = (eventId) => {
  const params = `?namespace=${namespace}&eventId=${eventId}`
  const url = paths.namedQuery('get-event-model', params)
  return doGet(url).then(({ data = [] }) => data.shift().model)
}
