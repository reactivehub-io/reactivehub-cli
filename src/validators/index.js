const idPatternValidator = (value) => {
  if (value.match(/^[a-z][a-z\-]*$/g)) return true
  return 'You can only use letters and "-" to fill whitespaces'
}

module.exports = {
  idPatternValidator,
}
