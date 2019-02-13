export default {
  issue: {
    fields: {
      assignee: {
        name: 'String',
      },
      resolution: {
        name: 'String',
      },
      project: {
        key: 'String',
      },
      summary: 'String',
      description: {
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
