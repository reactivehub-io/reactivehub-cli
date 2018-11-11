import { sendAction } from '../../services/api'

export default {
  name: 'KMS',
  actions: [{
    name: 'encrypt',
    processor: 'KMS_ENCRYPT',
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'KMS_ENCRYPT', ...action }),
    buildTemplate: ({ keyId = '' } = {}) => ({
      KeyId: keyId,
      Data: 'string | object [required]',
      EncryptionContext: '',
      GrantTokens: '',
    }),
    questions: () => [
      {
        type: 'input',
        name: 'keyId',
        message: 'Enter the encryption key...',
      },
    ],
  }],
}
