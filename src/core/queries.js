import chalk from 'chalk'
import fs from 'fs-extra'
import * as api from '../services/api'
import messages from '../messages'
import ServiceAccounts from '../serviceAccounts'
import questions from '../commands/questions/query'
import prompt from '../libs/inquirer'
import config from './config'
import yaml from './yaml'

const checkAvailableTypes = (availableListeners, type) => {
  if (!availableListeners) {
    messages.error(`Query endpoints of type ${chalk.blue.bold(type)} are not supported!`)
    return false
  }
  return true
}

const createFile = ({ serviceAccountId, id, scope }) => {
  const listenerFolder = config.folders.queries()
  let folderPath = `${listenerFolder}`
  if (scope && scope !== '') folderPath = `${folderPath}/${scope}`

  const yamlPayload = {
    id,
    scope,
    serviceAccountId,
    query: 'PASTE YOUR QUERY HERE, USE WILDCARDS FOR MUTABLE PARAMS',
  }

  const created = yaml.create(folderPath, id, yamlPayload)
  if (created) messages.success(`Query ${chalk.blue.bold(id)} successfully created!`)
  return created
}

const loadTriggers = async (triggers = [], loadedEvents = null) => {
  let newTriggers = triggers
  let eventIds = loadedEvents || await api.getEventIds()
  if (!eventIds) {
    messages.info('Could not find deployed events. Deploy your events and run the add:listener trigger command.')
  } else {
    const { eventId } = await prompt(questions.selectEvent(eventIds))
    newTriggers.push({ eventId })
    eventIds = eventIds.filter(({ id }) => id !== eventId)
    const { addMoreTriggers } = await prompt(questions.addMoreTriggers)
    if (addMoreTriggers) {
      newTriggers = loadTriggers(newTriggers, eventIds)
    }
  }
  return newTriggers
}


const add = async (type) => {
  try {
    const [serviceAccounts, isAvailable] = await Promise.all([
      ServiceAccounts.getServiceAccounts({ type }),
      api.isAvailableQuerySerivce(type),
    ])

    if (!checkAvailableTypes(isAvailable, type)) return false

    if (!ServiceAccounts.checkSeviceAccounts(serviceAccounts, type)) return false

    const { serviceAccountId, id, scope } = await prompt(questions.create(serviceAccounts))

    return createFile({ serviceAccountId, id, scope })
  } catch (e) {
    console.log(e)
    return false
  }
}

const getFileMap = () => {
  const folder = config.folders.queries()
  if (!fs.pathExistsSync(folder)) return []

  const dirs = fs.readdirSync(folder)
  const files = dirs.map(dir => ({ dir: `${folder}/${dir}`, files: fs.readdirSync(`${folder}/${dir}`) }))
  return files
}

const prepareDeploy = (dir, file, namespace) => {
  try {
    const content = yaml.toJson(dir, file)
    const { query } = content
    content.query = query.replace(/(\r\n|\n|\r)/gm, ' ')
    return { ...content, namespace }
  } catch (e) {
    // eslint-disable-next-line
    messages.error(`Invalid YAML query ${dir}/${file} file, make sure that the query parameter is a valid single or a multi-line string. (https://yaml-multiline.info/)`)
    throw e
  }
}

export default {
  add,
  getFileMap,
  prepareDeploy,
}
