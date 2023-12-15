const { parseInput } = require('./parseInput')

const DIR_SIZE_LIMIT = 100000
const DISK_SPACE_USED_TARGET = 30000000

class Directory {
  constructor(dirName, dirPath) {
    this.dirName = dirName
    this.dirPath = dirPath
    this.files = []
  }

  getFileSizeSum() {
    return this.files.reduce(
      (currentSum, directoryFile) => currentSum + directoryFile.fileSize,
      0
    )
  }

  addFiles(files) {
    files.forEach((file) => {
      this.files.push(file)
    })
  }

  toString() {
    return `\n${this.dirName} (${this.files
      .map((file) => `${file.fileName} [${file.fileSize}]`)
      .join(', ')})`
  }

  findDuplicateFiles() {
    return this.files.filter((e, i, a) => a.indexOf(e) !== i)
  }
}

class DirectoryFile {
  constructor({ fileName = 'Unknown', fileSize = 0 }) {
    this.fileName = fileName
    this.fileSize = Number(fileSize)
  }
  toString() {
    return this.fileName
  }
}

class CurrentDirectoryTracker {
  constructor() {
    this.dirNameList = []
  }

  process(instruction) {
    const { isCommand, isCD, isCDMoveOut, targetDirName } = instruction
    if (isCommand && isCD) {
      if (isCDMoveOut) {
        this.dirNameList.pop()
      } else {
        this.dirNameList.push(targetDirName)
      }

      console.log(this.dirNameList.join('/'))
    }
  }

  getCurrentDirName() {
    const lastItemIndex = this.dirNameList.length - 1
    return this.dirNameList[lastItemIndex]
  }

  getCurrentDirPath() {
    return this.dirNameList.join('/')
  }
}

const findFilesUntilNextCommand = (instructions, startIndex) => {
  let currentIndex = startIndex
  let filesFoundWithLS = []

  while (currentIndex < instructions.length) {
    const currentInstruction = instructions[currentIndex]

    const hasReachedNextCommand = currentInstruction.isCommand
    if (hasReachedNextCommand) {
      break
    }

    if (currentInstruction.isFile) {
      const { fileSize, fileName } = currentInstruction
      filesFoundWithLS.push(new DirectoryFile({ fileSize, fileName }))
    }

    currentIndex++
  }

  return filesFoundWithLS
}

const processInstructions = (instructions = []) => {
  const directoryList = []
  const dirTracker = new CurrentDirectoryTracker()

  instructions.forEach((instruction, index) => {
    dirTracker.process(instruction)

    if (instruction.isLS) {
      const files = findFilesUntilNextCommand(instructions, index + 1)

      const currentDirName = dirTracker.getCurrentDirName()
      const currentDirPath = dirTracker.getCurrentDirPath()
      const newDirectory = new Directory(currentDirName, currentDirPath)
      directoryList.push(newDirectory)

      console.log('Found', files.length, 'files in', currentDirPath)

      directoryList.forEach((directory) => {
        const shouldIncludeChildDirectoryFiles = currentDirPath.includes(
          directory.dirPath
        )

        if (shouldIncludeChildDirectoryFiles) {
          directory.addFiles(files)
        }
      })
    }
  })

  return directoryList
}

const findDirectoriesWorthDeleting = (directoryList) => {
  const sortedDirList = directoryList.sort((a, b) => b - a)

  // Root dir
  const diskSpaceUsed = sortedDirList[0].getFileSizeSum()
  const diskSpaceToDelete = diskSpaceUsed - DISK_SPACE_USED_TARGET

  console.log('Dir', sortedDirList[0].dirName, 'uses space:', diskSpaceUsed)
  console.log('We need to delete', diskSpaceToDelete)

  const deletableDirList = sortedDirList.filter((dir) => {
    const isWorthDeleting = dir.getFileSizeSum() >= diskSpaceToDelete

    if (isWorthDeleting) {
      console.log(
        'Deleting',
        dir.dirPath,
        'gives',
        dir.getFileSizeSum(),
        'space, resulting in disk used',
        diskSpaceUsed - dir.getFileSizeSum()
      )
      return true
    }

    return false
  })

  return deletableDirList
}

function partOne(filename) {
  const instructions = parseInput(filename)

  const directoryList = processInstructions(instructions)

  /*
  const reasonableSizeDirList = directoryList.filter(
    (dir) => dir.getFileSizeSum() < DIR_SIZE_LIMIT
  )

  const resultFileSizeSum = reasonableSizeDirList.reduce(
    (sum, dir) => sum + dir.getFileSizeSum(),
    0
  )

  console.log(
    'Day 7, part one: ',
    'out of',
    directoryList.length,
    'directories, ',
    reasonableSizeDirList.length,
    'directories are under the dir size limit of',
    DIR_SIZE_LIMIT,
    '. Their sum is',
    resultFileSizeSum
  )
*/
  const deletableDirList = findDirectoriesWorthDeleting(directoryList)

  const dirListWithDupes = directoryList.filter(
    (dir) => dir.findDuplicateFiles().length > 0
  )

  console.log(dirListWithDupes[0])

  // console.table(dirListWithDupes)

  console.log(
    'Day 7, part two: List of dirs worth deleting:',
    deletableDirList.map((dir) => dir.dirName)
  )
}

partOne('day7/input.txt')
