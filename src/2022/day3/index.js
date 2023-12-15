const { getLinesFromFile } = require('../getLinesFromFile')

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const getPriority = (letter) => {
  const priority = alphabet.indexOf(letter.toLowerCase()) + 1
  const multiplier = alphabet.length
  const isUpperCase = letter.toUpperCase() === letter
  const priorityWithMultiplier = isUpperCase ? priority + multiplier : priority

  // console.log(letter, '=', priorityWithMultiplier)

  return priorityWithMultiplier
}

function getCompartments(data) {
  const breakpoint = data.length / 2
  return [data.substr(0, breakpoint), data.substr(breakpoint)]
}

function findCommonItemFromCompartments(compartments) {
  const [firstCompartment, ...otherCompartments] = compartments
  const filterUnique = (v, i, a) => a.indexOf(v) === i
  const findMatchInAllCompartments = (letter) =>
    otherCompartments.every((compartment) => compartment.includes(letter))

  const itemsInBothCompartments = firstCompartment
    .split('')
    .filter(findMatchInAllCompartments)
    .filter(filterUnique)

  if (itemsInBothCompartments.length > 1) {
    console.error('bad', itemsInBothCompartments)
    throw new RangeError('Compartments have more than one similarity')
  }

  return itemsInBothCompartments[0]
}

function partOne(filename) {
  const lines = getLinesFromFile(filename)

  const priorities = lines.map((line) => {
    const [first, second] = getCompartments(line)

    const commonItemFromBothCompartments = findCommonItemFromCompartments([
      first,
      second,
    ])

    const priority = getPriority(commonItemFromBothCompartments)

    return priority
  })

  console.log(
    'Part one:',
    priorities.reduce((sum = 0, val) => sum + val)
  )
}

function partTwo(filename) {
  const lines = getLinesFromFile(filename)

  const sum = lines.reduce((result, line, index, array) => {
    const isThirdItem = (index + 1) % 3 === 0

    if (isThirdItem) {
      const commonItemFromCompartments = findCommonItemFromCompartments([
        array[index - 2],
        array[index - 1],
        array[index],
      ])

      const priority = getPriority(commonItemFromCompartments)

      // console.log(commonItemFromCompartments, '=', priority)

      return result + priority
    }

    return result
  }, 0)

  console.log('Part two:', sum)
}

// Main

partOne('day3/input.txt')
partTwo('day3/input.txt')
