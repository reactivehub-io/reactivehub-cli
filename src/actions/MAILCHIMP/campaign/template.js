export default {
  folder: {
    name: 'String',
  },
  campaign: {
    type: 'String | regular, plaintext, ab, split, rss, variate',
    recipients: {
      list_id: 'String',
    },
    settings: {
      subject_line: 'String',
      preview_text: 'String',
      title: 'String',
      from_name: 'String',
      reply_to: 'String',
      use_conversation: false,
      to_name: 'String',
      folder_id: 'String',
      authenticate: true,
      auto_footer: true,
      inline_css: true,
      auto_tweet: false,
      auto_fb_post: 'Array',
      fb_comments: false,
      template_id: 'Number',
    },
    variate_settings: {
      winner_criteria: 'String',
      wait_time: 'Number',
      test_size: 'Number',
      subject_lines: 'Array',
      send_times: 'Array',
      from_names: 'Array',
      reply_to_addresses: 'Array',
    },
    tracking: {
      opens: true,
      html_clicks: true,
      text_clicks: true,
      goal_tracking: true,
      ecomm360: true,
      google_analytics: 'String',
      clicktale: 'String',
      salesforce: {
        campaign: true,
        notes: true,
      },
      capsule: {
        notes: true,
      },
    },
    rss_opts: {
      feed_url: 'String',
      frequency: 'String',
      constrain_rss_img: 'Boolean',
      schedule: {
        hour: 'Number',
        daily_send: {
          sunday: true,
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
        },
        weekly_send_day: 'String',
        monthly_send_date: 'Number',
      },
    },
    social_card: {
      image_url: 'String',
      description: 'String',
      title: 'String',
    },
  },
  schedule: {
    schedule_time: 'String',
    timewarp: true,
    batch_delivery: {
      batch_delay: 'Number',
      batch_count: 'Number',
    },
  },
  test: {
    test_emails: ['my-mail@test.com'],
    send_type: 'String | html, plaintext',
  },
}
