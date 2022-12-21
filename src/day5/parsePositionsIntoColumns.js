// Assuming that when brackets end, the crate positioning map has ended.
const hasReachedEndOfCrateMap = (line) => !line.split('').includes('[')
const arraySafePush = (array, item) => (!array ? [item] : [...array, item])

const parseCratePositionPerLine = (currentLine) => {
  let currentLineResult = []
  let currentColumnIndex = 1 // Start from 1, zero is '['

  while (currentColumnIndex < currentLine.length) {
    currentLineResult.push(currentLine[currentColumnIndex])

    currentColumnIndex += 4
  }

  return currentLineResult
}

const parseCratePositions = (lines) => {
  let currentLineIndex = 0
  let currentLine = lines[currentLineIndex]

  let cratePositionMap = []

  while (!hasReachedEndOfCrateMap(currentLine)) {
    //
    const lineResult = parseCratePositionPerLine(currentLine)

    lineResult.forEach((letter, columnIndex) => {
      cratePositionMap[columnIndex] = arraySafePush(
        cratePositionMap[columnIndex],
        letter
      )
    })

    //
    currentLineIndex++
    currentLine = lines[currentLineIndex]
  }

  return cratePositionMap
}

const parsePositionsIntoColumns = (lines) => {
  const crateColumns = parseCratePositions(lines)
  const cleanCrateColumns = crateColumns.map((column) =>
    column.filter((columnItem) => !!columnItem.trim())
  )

  return cleanCrateColumns
}

exports.parsePositionsIntoColumns = parsePositionsIntoColumns
