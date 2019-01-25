const fs = require('fs-extra')

const cwd = process.cwd()
const rcName = '.rhubrc.json'

const folder = `${cwd}/${rcName}`
const exists = fs.existsSync(folder)

console.log(folder)
console.log(exists)

