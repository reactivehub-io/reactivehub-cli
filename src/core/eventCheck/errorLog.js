import file from '../../libs/file'

const fileName = 'errors.log'

let fileContent = `ERROR LOG: ${new Date()}\n`

const logErros = eventErrors => eventErrors.forEach((error) => {
  const { action, filter, messages = [] } = error
  if (filter) fileContent += `Filter: ${filter} `
  if (action) fileContent += `Action: ${action} `
  if (!action && !filter) fileContent += 'General: '
  fileContent += '\n'
  messages.forEach((message) => { fileContent += `    - ${message}\n` })
  fileContent += '\n'
})

const create = async (totalErrors, errors = []) => {
  fileContent += `Total events with errors: ${totalErrors}\n`
  errors.forEach((error) => {
    const { id, totalErrors: totalEventErrors, errors: eventErrors } = error
    fileContent += '\n---------------------------------------- \n'
    fileContent += `Event: ${id} \n`
    fileContent += `Total Errors: ${totalEventErrors} \n\n`
    logErros(eventErrors)
    fileContent += '---------------------------------------- \n'
  })
  return file.create('logs', fileName, fileContent)
}

export default {
  create,
}
