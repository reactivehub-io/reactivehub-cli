import filter from './filter'
import issue from './issue'
import group from './group'
import project from './project'
import user from './user'
import webhook from './webhook'

export default {
  ...filter,
  ...issue,
  ...group,
  ...project,
  ...user,
  ...webhook,
}
