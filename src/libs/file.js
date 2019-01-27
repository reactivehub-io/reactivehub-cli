import fse from 'fs-extra'

const folderPath = folder => `${process.cwd()}/${folder}`

const fullPath = (folder, fileName) => `${folderPath(folder)}/${fileName}`

const create = (folder, fileName, data) => {
  const path = fullPath(folder, fileName)
  console.log(path)
  fse.outputFileSync(path, data)
  return path
}

const exists = (folder, fileName) => fse.existsSync(`${folder}/${fileName}`)

export default {
  folderPath,
  fullPath,
  create,
  exists,
}
