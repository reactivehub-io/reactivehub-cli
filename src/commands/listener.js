import ServiceAccounts from '../serviceAccounts'

const addListener = (program) => {
  program
    .command('add:listener <type>')
    .description('Add event listener')
    .action(async (type) => {
      try {
        // TODO - CHECK IF LISTENER EXISTS
        const serviceAccounts = await ServiceAccounts.getServiceAccountsOfType(type)
        if (!serviceAccounts) return false
        
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    })
}

export default {
  init: (program) => {
    addListener(program)
  },
}
