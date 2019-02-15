import messages from './validatorMessages'

const checkListenerEnabled = async (serviceAccountId, type, serviceAccounts = []) => {
  const { listener_enabled: isListenerEnabled } = serviceAccounts.filter(({ id }) => serviceAccountId === id).shift()
  if (!isListenerEnabled) messages({ serviceAccountId, type }).SECRET_NOT_ENABLED()
  return isListenerEnabled
}

export default {
  checkListenerEnabled,
}
