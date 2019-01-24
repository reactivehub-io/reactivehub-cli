import chalk from 'chalk'
import * as api from '../services/api'
import messages from '../messages'

const typeAlias = {
  GCP: 'GOOGLE_CLOUD_PLATFORM',
  POSTGRES: 'POSTGRESQL',
  HTTP: 'API',
}

const servicesMock = [
  {
    id: 'service-account-id-1',
    name: 'Service Account 1',
    type: 'AWS',
  },
  {
    id: 'service-account-id-2',
    name: 'Service Account 2',
    type: 'GOOGLE_CLOUD_PLATFORM',
  },
  {
    id: 'service-account-id-2',
    name: 'Service Account 2',
    type: 'HTTP',
  },
  {
    id: 'service-account-id-3',
    name: 'Service Account 3',
    type: 'MAILCHIMP',
  },
  {
    id: 'mysql-service-account',
    name: 'My MySQL Service',
    type: 'MYSQL',
  },
  {
    id: 'PSQL-service-account',
    name: 'PSQL Service',
    type: 'POSTGRESQL',
  },
  {
    id: 'REDIS-service-account',
    name: 'REDIS Service',
    type: 'REDIS',
  },
  {
    id: 'SLACK-service-account',
    name: 'SLACK Service',
    type: 'SLACK',
  },
]

const getServiceAccounts = async ({ type: typeParam }) => {
  const type = typeAlias[typeParam] || typeParam
  const services = await api.getServiceAccounts(type)
  if (type) return services.filter(service => service.type === type)
  return services
}

const isServiceAccountOfType = async ({ type: typeParam, id }) => {
  const type = typeAlias[typeParam] || typeParam
  const services = await api.getServiceAccounts(type)
  return services.filter(service => service.id === id && service.type === type)
    .length > 0
}


const checkSeviceAccounts = (serviceAccountsOfType, type) => {
  if (!serviceAccountsOfType || serviceAccountsOfType.length === 0) {
    messages.error(`Service accounts of type ${chalk.blue.bold(type)} does not exists!`)
    messages.info(`Go to https://console.reactivehub.io/service-accounts/new/${type} and create a new service account entry.`)
    return false
  }
  return true
}

const getServiceAccountsOfType = async (type) => {
  const serviceAccountsOfType = await getServiceAccounts({ type })
  if (!checkSeviceAccounts(serviceAccountsOfType)) return false
  return serviceAccountsOfType
}


export default {
  getServiceAccounts,
  isServiceAccountOfType,
  getServiceAccountsOfType,
  checkSeviceAccounts,
}
