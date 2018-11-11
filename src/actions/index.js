import chalk from 'chalk'
import AWS from './AWS'
import GOOGLE_CLOUD_PLATFORM from './GOOGLE_CLOUD_PLATFORM'
import HTTP from './HTTP'
import MAILCHIMP from './MAILCHIMP'
import MYSQL from './MYSQL'
import POSTGRESQL from './POSTGRESQL'
import REDIS from './REDIS'
import SLACK from './SLACK'
import messages from '../messages'

const actions = {
  AWS,
  GOOGLE_CLOUD_PLATFORM,
  GCP: GOOGLE_CLOUD_PLATFORM,
  HTTP,
  MAILCHIMP,
  MYSQL,
  POSTGRESQL,
  POSTGRES: POSTGRESQL,
  REDIS,
  SLACK,
}

const getActionConfig = (type, action) => {
  const actionType = actions[type]
  if (!actionType) {
    messages.error(`Action ${chalk.blue.bold(type)} does not exists!`)
    return false
  }

  const actionConfig = actionType[action]
  if (!actionConfig) {
    messages.error(`Action ${chalk.blue.bold(`${type}:${action}`)} does not exists!`)
    return false
  }

  return actionConfig
}

export default {
  getActionConfig,
}
