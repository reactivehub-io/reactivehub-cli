import { sendAction } from '../../services/api'

export default {
  name: 'SES',
  actions: [{
    name: 'Send Template E-mail',
    action: 'SES_SEND_TEMPLATED_EMAIL',
    deploy: (action, eventInfo) => sendAction(eventInfo, { serviceAction: 'SES_SEND_TEMPLATED_EMAIL', ...action }),
    buildTemplate: () => ({
      Source: null,
      Template: null,
      TemplateData: null,
      ConfigurationSetName: null,
      ReturnPath: null,
      ReturnPathArn: null,
      SourceArn: null,
      TemplateArn: null,
      Destination: {
        BccAddresses: [
          'email@example.com',
        ],
        CcAddresses: [
          {
            'email@example.com': null,
          },
        ],
        ToAddresses: [
          'email@example.com',
        ],
      },
      ReplyToAddresses: [
        'email@example.com',
      ],
      Tags: [
        {
          Name: null,
          Value: null,
        },
        {
          Name: null,
          Value: null,
        },
      ],
    }),
  }],
}
