import member from './member'
import list from './list'
import mergeField from './mergeFields'
import signupForm from './signupForm'
import webhook from './webhook'

export default {
  name: 'LIST',
  actions: [
    member.ADD_LIST_MEMBER,
    member.EDIT_LIST_MEMBER,
    member.DELETE_LIST_MEMBER,
    list.CREATE_LIST,
    list.EDIT_LIST,
    list.DELETE_LIST,
    mergeField.CREATE_MERGE_FIELD,
    mergeField.EDIT_MERGE_FIELD,
    mergeField.DELETE_MERGE_FIELD,
    signupForm.CREATE_SIGNUP_FORM,
    webhook.CREATE_WEBHOOK,
    webhook.EDIT_WEBHOOK,
    webhook.DELETE_WEBHOOK,
  ],
}
