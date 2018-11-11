import fse from 'fs-extra'

const folderPath = folder => `${process.cwd()}/${folder}`

const fullPath = (folder, fileName) => `${folderPath(folder)}/${fileName}`

const create = (folder, fileName, data) => {
  const path = fullPath(folder, fileName)
  fse.outputFileSync(path, data)
  return path
}

export default {
  folderPath,
  fullPath,
  create,
}
