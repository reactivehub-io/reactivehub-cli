import checks from '../check'
import event from '../../core/event'

const enterTriggerEvent = {
  type: 'list',
  name: 'id',
  message: 'Please choose a type of trigger event:',
  choices: checks.validTriggers,
}

const enterEventId = {
  type: 'list',
  name: 'id',
  message: 'Please choose the event id related to the trigger:',
  choices: event.getEventsInFolder(),
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
