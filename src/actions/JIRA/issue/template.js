export default {
  issue: {
    update: {
      comment: [
        {
          add: {
            body: {
              type: 'doc',
              version: 1,
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'String',
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    },
    fields: {
      assignee: {
        name: 'String',
      },
      resolution: {
        name: 'String',
      },
    },
    transition: {
      id: 'String',
    },
    properties: [
      {
        key: 'String',
        value: 'String',
      },
    ],
  },
  assign: {
    accountId: 'String',
  },
  comment: {
    body: {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'String',
            },
          ],
        },
      ],
    },
  },
  issueLink: {
    type: {
      name: 'Duplicate',
    },
    inwardIssue: {
      key: 'String',
    },
    outwardIssue: {
      key: 'String',
    },
    comment: {
      body: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'String',
              },
            ],
          },
        ],
      },
    },
  },
}
