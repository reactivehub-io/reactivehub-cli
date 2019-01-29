import fs from 'fs-extra'
import chalk from 'chalk'
import messages from '../messages'
import file from '../libs/file'

const cwd = process.cwd()
const rcJsonName = '.rhubrc'
const jsonPath = `${cwd}/${rcJsonName}`
const rcPayload = `{
  "events": {
    "folder": "events"
  },
  "listeners": {
    "folder": "listeners"
  },
  "queries": {
    "folder": "queries"
  },
}`

const existsRC = () => fs.existsSync(jsonPath)

const getConfigurationFile = () => {
  if (!existsRC()) {
    messages.error(`Could not find the ${chalk.blueBright(rcJsonName)} file at ${cwd}`)
    throw new Error('Configuration file not found, run the "rhub init" command.')
  }
  return fs.readJSONSync(jsonPath)
}

const getFolder = (name) => {
  const { folder = name } = getConfigurationFile()[name] || {}
  return folder
}

const createRhubRC = () => file.create('', rcJsonName, rcPayload)


export default {
  createRhubRC,
  existsRC,
  getConfigurationFile,
  folders: {
    events: () => getFolder('events'),
    listeners: () => getFolder('listeners'),
    queries: () => getFolder('queries')
  },
}
