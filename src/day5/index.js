const { getLinesFromFile } = require('../utils')
const { parseInput } = require('./parseInput')

const processInstruction = (
  columns,
  sourceColumnNumber,
  targetColumnNumber
) => {
  const sourceColumnIndex = sourceColumnNumber - 1
  const targetColumnIndex = targetColumnNumber - 1

  const sourceColumn = columns[sourceColumnIndex]
  const targetColumn = columns[targetColumnIndex]

  if (sourceColumn.length === 0) {
    console.log('Nothing to take from column', sourceColumnNumber)
    return
  }

  const movedItem = sourceColumn.shift()
  targetColumn.unshift(movedItem)

  /*
  console.log(
    'Moved',
    movedItem,
    'from',
    sourceColumn,
    'resulting in',
    targetColumn
  )
  */

  return columns
}

const processInstructionPartTwo = (
  columns,
  howMany,
  sourceColumnNumber,
  targetColumnNumber
) => {
  const sourceColumnIndex = sourceColumnNumber - 1
  const targetColumnIndex = targetColumnNumber - 1

  const sourceColumn = columns[sourceColumnIndex]
  const targetColumn = columns[targetColumnIndex]

  if (sourceColumn.length === 0) {
    console.log('Nothing to take from column', sourceColumnNumber)
    return
  }

  const removedItems = sourceColumn.splice(0, howMany)
  targetColumn.unshift(...removedItems)

  /*
  console.log(
    'Moved',
    movedItem,
    'from',
    sourceColumn,
    'resulting in',
    targetColumn
  )
  */

  return columns
}

const processInstructions = (columns = [], instructions = []) => {
  instructions.forEach((str = '') => {
    const [, movesCount, , sourceColumnNumber, , targetColumnNumber] =
      str.split(' ')

    let movesLeft = movesCount

    while (movesLeft !== 0) {
      processInstruction(columns, sourceColumnNumber, targetColumnNumber)

      movesLeft -= 1
    }
  })

  return columns
}

const processInstructionsPartTwo = (columns = [], instructions = []) => {
  instructions.forEach((str = '') => {
    const [, howMany, , sourceColumnNumber, , targetColumnNumber] =
      str.split(' ')

    processInstructionPartTwo(
      columns,
      howMany,
      sourceColumnNumber,
      targetColumnNumber
    )
  })

  return columns
}

function partOne(filename) {
  const lines = getLinesFromFile(filename)

  const { crateColumns, instructions } = parseInput(lines)

  processInstructions(crateColumns, instructions)

  // console.table(crateColumns)

  const result = crateColumns.map((array) => array[0])

  console.log('Day 5 Part One result:', result.join(''))
}

function partTwo(filename) {
  const lines = getLinesFromFile(filename)
  const { crateColumns, instructions } = parseInput(lines)

  processInstructionsPartTwo(crateColumns, instructions)

  const result = crateColumns.map((array) => array[0])

  console.log('Day 5 Part Two result:', result.join(''))
}

partOne('day5/input.txt')
partTwo('day5/input.txt')
