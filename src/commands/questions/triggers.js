import checks from '../check'

const enterTriggerEvent = {
  type: 'input',
  name: 'id',
  message: 'Please enter a trigger event:',
  validate: input => !input || checks.checkTrigger(input),
}

const enterEventId = {
  type: 'input',
  name: 'id',
  message: 'Please enter a valid event id (in the form form groupName.eventId):',
  validate: input => !input || checks.checkEvent(input),
}

const enterFilterId = {
  type: 'input',
  name: 'id',
  message: 'Please enter a valid filter id:',
}

const enterActionId = {
  type: 'input',
  name: 'id',
  message: 'Please enter a valid action id:',
}

export default {
  enterTriggerEvent,
  enterEventId,
  enterFilterId,
  enterActionId,
}
