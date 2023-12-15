const { getLinesFromFile } = require('../getLinesFromFile')

function calculateShapeScore(myMove) {
  if (isRock(myMove)) return 1
  if (isPaper(myMove)) return 2
  if (isScissors(myMove)) return 3

  console.error('This should not happen. Unable to calculate score of my move')

  return 0
}
const isRock = (move) => ['A', 'X'].includes(move)
const isPaper = (move) => ['B', 'Y'].includes(move)
const isScissors = (move) => ['C', 'Z'].includes(move)

function calculateOutcomeScore(theirMove, myMove) {
  if (isRock(theirMove)) {
    if (isRock(myMove)) return 3
    if (isPaper(myMove)) return 6
    if (isScissors(myMove)) return 0
  }
  if (isPaper(theirMove)) {
    if (isRock(myMove)) return 0
    if (isPaper(myMove)) return 3
    if (isScissors(myMove)) return 6
  }
  if (isScissors(theirMove)) {
    if (isRock(myMove)) return 6
    if (isPaper(myMove)) return 0
    if (isScissors(myMove)) return 3
  }
}

function calculateMyMove(theirMove, desiredOutcome) {
  const rock = 'A'
  const paper = 'B'
  const scissors = 'C'

  const iShouldLose = desiredOutcome === 'X'
  if (iShouldLose) {
    if (isRock(theirMove)) return scissors
    if (isPaper(theirMove)) return rock
    if (isScissors(theirMove)) return paper
  }

  const iShouldDraw = desiredOutcome === 'Y'
  if (iShouldDraw) {
    if (isRock(theirMove)) return rock
    if (isPaper(theirMove)) return paper
    if (isScissors(theirMove)) return scissors
  }

  const iShouldWin = desiredOutcome === 'Z'
  if (iShouldWin) {
    if (isRock(theirMove)) return paper
    if (isPaper(theirMove)) return scissors
    if (isScissors(theirMove)) return rock
  }

  console.log('This should not happen. Unable to calculate my move.')
}

function processLine(line) {
  const theirMove = line[0]
  const desiredOutcome = line[2]

  const myMove = calculateMyMove(theirMove, desiredOutcome)

  return {
    shapeScore: calculateShapeScore(myMove),
    outcomeScore: calculateOutcomeScore(theirMove, myMove),
  }
}

function partTwo(filename) {
  const lines = getLinesFromFile(filename)

  const totalScore = lines.reduce((sum, line) => {
    const { shapeScore, outcomeScore } = processLine(line)

    return sum + shapeScore + outcomeScore
  }, 0)

  console.log('Part two score is', totalScore)
}

module.exports = {
  partTwo,
}
