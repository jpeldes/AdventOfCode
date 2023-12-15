const { getLinesFromFile } = require('../getLinesFromFile')

// Part 1

function partOne(filename) {
  const lines = getLinesFromFile(filename)

  var elfCaloriesArray = getElfCaloriesArray(lines)

  var [biggestIndex, biggestValue] = getBiggestSum(elfCaloriesArray)

  console.log(
    'Part one: Elf',
    biggestIndex + 1,
    'has the most calories:',
    biggestValue
  )
}

function getBiggestSum(list) {
  var maxIndex = 0
  var maxValue = list[maxIndex]

  list.forEach((value, index) => {
    if (value > maxValue) {
      maxIndex = index
      maxValue = value
    }
  })

  return [maxIndex, maxValue]
}

function getElfCaloriesArray(lines) {
  var sum = 0
  var result = []

  lines.forEach((value) => {
    if (value === '') {
      result.push(sum)
      sum = 0
    } else {
      sum += Number(value)
    }
  })

  return result
}

// Part 2

function partTwo(filename) {
  const lines = getLinesFromFile(filename)

  var elfCaloriesArray = getElfCaloriesArray(lines)

  var [v1, v2, v3] = elfCaloriesArray.sort((a, b) => b - a)

  var sum = v1 + v2 + v3

  console.log('Part two: Top three calories:', sum)
}

// Main
partOne('day1/input.txt')
partTwo('day1/input.txt')
