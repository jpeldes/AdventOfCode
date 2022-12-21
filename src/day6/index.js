const { getLinesFromFile } = require('../utils')

const INDEX_TO_START_FROM = 3

const filterUnique = (v, i, a) => a.indexOf(v) === i

const findFourLetterStringWithAllUnique = (searchString) => {
  const length = 4
  let startSearchFromIndex = -1

  console.log('Searching among', searchString.length, 'letters')

  while (startSearchFromIndex < searchString.length) {
    ++startSearchFromIndex

    if (startSearchFromIndex < INDEX_TO_START_FROM) {
      continue
    }

    const substring = searchString.substr(startSearchFromIndex, length)
    const uniqueLetters = substring.split('').filter(filterUnique)

    // console.log(startSearchFromIndex, substring, uniqueLetters)

    const isAllLettersUnique = uniqueLetters.length === 4
    if (isAllLettersUnique) {
      return startSearchFromIndex + uniqueLetters.length
    }
  }
}

function partOne(filename) {
  const lines = getLinesFromFile(filename)

  const line = lines[0]

  const result = findFourLetterStringWithAllUnique(line)

  console.log(`Day 6, part one: ${result}th letter has 4 unique letters`)
}

partOne('day6/input.txt')
