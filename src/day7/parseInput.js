const { getLinesFromFile } = require('../utils')

function getIsLineStartsWithNumber(line = '') {
  const firstPart = line.split(' ')[0]
  const number = parseInt(firstPart)

  return typeof number === 'number' && !isNaN(number)
}

function parseOneInstruction(line = '') {
  let instruction = {}

  const parts = line.split(' ')

  const isCommand = line.startsWith('$')
  if (isCommand) {
    instruction.isCommand = true

    if (parts[1] === 'cd') {
      instruction.isCD = true
      instruction.targetDirName = parts[2]
      instruction.isCDMoveOut = parts[2] === '..'
    }
    if (parts[1] === 'ls') {
      instruction.isLS = true
    }
  }

  const isDirectory = line.startsWith('dir')
  if (isDirectory) {
    instruction.isDirectory = true
    instruction.dirName = parts[1]
  }

  const isFile = getIsLineStartsWithNumber(line)
  if (isFile) {
    instruction.isFile = true
    instruction.fileSize = parseInt(line.split(' ')[0])
    instruction.fileName = line.split(' ')[1]
  }

  return instruction
}

function parseInput(filename) {
  const lines = getLinesFromFile(filename)
  const instructions = lines.map(parseOneInstruction)
  return instructions
}

exports.parseInput = parseInput
