const baseCommand = 'rhub'

export default {
  addActionOnFilter: (event, filter) => `${baseCommand} add action ${event} ${filter}`,
}
