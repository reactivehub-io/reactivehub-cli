import fse from 'fs-extra'
import yaml from 'yamljs'
import messages from '../messages'
import file from '../libs/file'

const getFileName = (fileName) => {
  const hasYamlInName = fileName.match('.yaml') 
  const name = !hasYamlInName ? `${fileName}.yaml` : fileName
  return name
}

const fileExists = (folder, fileName) => {
  const path = file.fullPath(folder, getFileName(fileName))
  return fse.existsSync(path)
}

const create = (folder, fileName, payload) => {
  const path = file.fullPath(folder, getFileName(fileName))
  const data = yaml.stringify(payload, 12, 2)
  fse.outputFileSync(path, data)
  messages.info(`File created at ${path}`)
  return true
}

const filesInFolder = (folder) => {
  const path = file.folderPath(folder)
  if (!fse.pathExistsSync(path)) return []
  return fse.readdirSync(path)
}

const toJson = (folder, fileName) => {
  const path = file.fullPath(folder, getFileName(fileName))
  return yaml.load(path)
}

export default {
  create,
  fileExists,
  filesInFolder,
  toJson,
}
