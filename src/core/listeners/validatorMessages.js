import chalk from 'chalk'
import messages from '../../messages'

export default ({ serviceAccountId, type }) => ({
  SECRET_NOT_ENABLED: () => {
    messages.error(`
      ${chalk.blueBright(type)} listener is not enabled for Integration Account ${chalk.blueBright(serviceAccountId)}.
      Go to the listeners page and enable it:
      https://console.reactivehub.io/integration-accounts/${serviceAccountId}/listeners
    `)
  },
})
