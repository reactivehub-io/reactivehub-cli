import * as api from '../services/api'

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

export default {
  getServiceAccounts,
  isServiceAccountOfType,
}
