# Reactivehub Cli


## Instalation

1. Make sure you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) installed on your machine.

2. Install the Reactivehub CLI tools.

```bash
  npm install -g @reactivehub/cli
```

All CLI commands will be available with the ``  rhub  `` command.

## Authentication

1. In order to use all CLI features you must be authenticated, for that, run the login command in your terminal:

```bash
  rhub login
```

2. Access the [admin console](https://console.reactivehub.io/api-token/cli-auth) and follow the auth steps.

3. Congratulations, you're all set!

## Service Accounts

For security purposes, service accounts can only be added to your account in the [admin console.](https://console.reactivehub.io/service-account)

## Commands

The command `rhub --help` list all available core commands, all **action commands** are available at the [documentation page.](https://docs.reactivehub.io) 

Command | Description
------------ | -------------
**init** | Create the **.rhubrc** configuration file.
**login** | Authenticate to your **Reactivehub** account, you'll be redirect to the console admin to issue your auth code.
**add:event** | Create a new event config YAML in the **/events** folder in the directory where the command was executed.
**add:filter** | Add a new filter to an event.
**add:action {eventId} {filterId} {type} {action}** | Add a Cloud Service action to an Event Filter.
**deploy** | Deploy all events to your **Reactivehub namespace API**.
**test** | Test your event YAML config.

## Action Commands

Check the [action documentation page](https://docs.reactivehub.io/guide/cloud-services-integration) to view all available commands.

* [Amazon Web Services](https://docs.reactivehub.io/guide/cloud-services-integration/amazon-web-services)
* [Google Cloud Platform](https://docs.reactivehub.io/guide/cloud-services-integration/google-cloud-platform)
* [Custom and thrid party APIs](https://docs.reactivehub.io/guide/cloud-services-integration/custom-apis)
* [MySQL](https://docs.reactivehub.io/guide/cloud-services-integration/mysql)
* [PostgreSQL](https://docs.reactivehub.io/guide/cloud-services-integration/postgresql)
* [Redis](https://docs.reactivehub.io/guide/cloud-services-integration/redis)
* [Slack](https://docs.reactivehub.io/guide/cloud-services-integration/slack)
* [MailChimp](https://docs.reactivehub.io/guide/cloud-services-integration/mailchimp)


## Deploy

All events are deployed under your namespace (**{namespace}.reactivehub.io/events**), the `rhub deploy` command will check and send to our servers all the YAML configuration files under the **/events** foldes in the directory where the command was executed.

