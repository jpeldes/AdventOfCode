const { parseInstructions } = require('./parseInstructions')
const { parsePositionsIntoColumns } = require('./parsePositionsIntoColumns')

const parseInput = (lines) => {
  const crateColumns = parsePositionsIntoColumns(lines)

  // console.table(crateColumns)

  const instructions = parseInstructions(lines)

  // console.table(instructions)

  return {
    crateColumns,
    instructions,
  }
}
exports.parseInput = parseInput
