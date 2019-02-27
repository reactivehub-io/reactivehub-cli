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
  choices: event.getEventsInFolder,
}

const enterFilterId = {
  type: 'list',
  name: 'id',
  message: 'Please choose the filter related to the trigger:',
  choices: undefined, // depends on eventId option
}

const enterActionId = {
  type: 'list',
  name: 'id',
  message: 'Please enter a valid action id:',
  choices: undefined, // depends on filterId option
}

export default {
  enterTriggerEvent,
  enterEventId,
  enterFilterId,
  enterActionId,
}
