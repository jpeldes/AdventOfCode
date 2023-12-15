const fs = require('fs')

function getLinesFromFile(filename) {
  const file = fs.readFileSync(__dirname + '/' + filename, 'utf-8')
  const lines = file.split(/\r?\n/)
  return lines
}

module.exports = {
  getLinesFromFile,
}
