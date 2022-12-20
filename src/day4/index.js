const { getLinesFromFile } = require('../utils')

const splitPairToSections = (pair) =>
  pair.split('-').map((numberAsString) => Number(numberAsString))

function getDoesPairFullyContainTheOther(pairs) {
  const firstPairSections = splitPairToSections(pairs[0])
  const secondPairSections = splitPairToSections(pairs[1])

  const doesPairFullyContainTheOther =
    firstPairSections[0] >= secondPairSections[0] &&
    firstPairSections[1] <= secondPairSections[1]

  return doesPairFullyContainTheOther
}

function partOne(filename) {
  const lines = getLinesFromFile(filename)

  const overlappingPairsArray = lines.filter((line) => {
    const [pair1, pair2] = line.split(',')
    const isFirstPairContainedInOther = getDoesPairFullyContainTheOther([
      pair1,
      pair2,
    ])

    const isSecondPairContainedInOther = getDoesPairFullyContainTheOther([
      pair2,
      pair1,
    ])

    return isFirstPairContainedInOther || isSecondPairContainedInOther
  })

  console.log(
    'day 4, part one:',
    overlappingPairsArray.length,
    'pairs out of',
    lines.length,
    'pairs are fully overlapping work'
  )
}

function getDoesPairOverlapWithTheOther(pairs) {
  const firstPairSections = splitPairToSections(pairs[0])
  const secondPairSections = splitPairToSections(pairs[1])

  const doesFirstPairReachTheOtherPair =
    firstPairSections[1] >= secondPairSections[0] &&
    secondPairSections[1] >= firstPairSections[0]

  return doesFirstPairReachTheOtherPair
}

function partTwo(filename) {
  const lines = getLinesFromFile(filename)

  const overlappingPairsArray = lines.filter((line) => {
    const [pair1, pair2] = line.split(',')
    const isPairsReachOthers = getDoesPairOverlapWithTheOther([pair1, pair2])

    return isPairsReachOthers
  })

  console.log(
    'day 4, part two:',
    overlappingPairsArray.length,
    'pairs out of',
    lines.length,
    'pairs are doing partially overlapping work'
  )
}

// partOne('day4/testinput.txt')
partOne('day4/input.txt')

// partTwo('day4/testinput.txt')
partTwo('day4/input.txt')
