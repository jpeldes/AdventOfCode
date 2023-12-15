const { getLinesFromFile } = require('../getLinesFromFile')

function calculateShapeScore(myMove) {
  if (isRock(myMove)) return 1
  if (isPaper(myMove)) return 2
  if (isScissors(myMove)) return 3

  console.error('This should not happen')

  return 0
}
const isRock = (move) => ['A', 'X'].includes(move)
const isPaper = (move) => ['B', 'Y'].includes(move)
const isScissors = (move) => ['C', 'Z'].includes(move)

function calculateOutcomeScore(theirMove, myMove) {
  if (isRock(theirMove)) {
    // Rock
    if (isRock(myMove)) return 3
    if (isPaper(myMove)) return 6
    if (isScissors(myMove)) return 0
  }
  if (isPaper(theirMove)) {
    // Paper
    if (isRock(myMove)) return 0
    if (isPaper(myMove)) return 3
    if (isScissors(myMove)) return 6
  }
  if (isScissors(theirMove)) {
    // Scissor
    if (isRock(myMove)) return 6
    if (isPaper(myMove)) return 0
    if (isScissors(myMove)) return 3
  }
}

function processLine(line) {
  const theirMove = line[0]
  const myMove = line[2]

  return {
    shapeScore: calculateShapeScore(myMove),
    outcomeScore: calculateOutcomeScore(theirMove, myMove),
  }
}

function partOne(filename) {
  const lines = getLinesFromFile(filename)

  const totalScore = lines.reduce((sum, line) => {
    const { shapeScore, outcomeScore } = processLine(line)

    return sum + shapeScore + outcomeScore
  }, 0)

  console.log('Part one score is', totalScore)
}

module.exports = {
  partOne,
}
