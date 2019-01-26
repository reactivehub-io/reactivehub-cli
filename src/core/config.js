import fs from 'fs-extra'
import chalk from 'chalk'
import messages from '../messages'

const cwd = process.cwd()
const rcJsonName = '.rhubrc'
const jsonPath = `${cwd}/${rcJsonName}`

const existsRC = () => fs.existsSync(jsonPath)

const getConfigurationFile = () => {
  if (!existsRC()) {
    messages.error(`Could not find the ${chalk.blueBright(rcJsonName)} file at ${cwd}`)
    throw new Error('Configuration file not found')
  }
  return fs.readJSONSync(jsonPath)
}

const getFolder = (name) => {
  const { folder = name } = getConfigurationFile()[name]
  return folder
}

export default {
  getConfigurationFile,
  folders: {
    events: () => getFolder('events'),
    listeners: () => getFolder('listeners'),
  },
}
