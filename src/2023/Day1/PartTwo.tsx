const isLogging = false
const logger = isLogging ? console.log : () => {}
const loggerGroup = isLogging ? console.group : () => {}
const loggerGroupEnd = isLogging ? console.groupEnd : () => {}

export const DayOnePartTwo = ({ input }: { input: string[] }) => {
    if (!input || !input.length) return null

    const inputWithNumbers = getEveryLineWithNumbersOnly(input)
    const lineSums = getEveryLineSum(inputWithNumbers)

    const sum = getAllLinesSum(lineSums)

    return (
        <div>
            <pre>
                <code>{input.join(' + ')}</code>
            </pre>
            <pre>
                <code>{inputWithNumbers.join(' + ')}</code>
            </pre>
            <pre>
                <code>{lineSums.join(' + ')}</code>
            </pre>
            <pre>
                Sum is <code>{sum}</code>
            </pre>
        </div>
    )
}

/*

const wordMap = {
    nine: '9',
    eight: '8',
    seven: '7',
    six: '6',
    five: '5',
    four: '4',
    three: '3',
    two: '2',
    one: '1',
}

*/

const wordMap = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
}

type NumberAsWord = keyof typeof wordMap

const replaceWordsWithNumbers = (input: string): string => {
    const numbersAsWords = Object.keys(wordMap) as NumberAsWord[]

    const original = input
    let result = input

    loggerGroup('Checking', result, 'for numbers')

    checkRecursively()

    return result

    // Helper functions for replacer

    function checkRecursively(index: number = 0) {
        if (index > result.length) {
            logger('✅ We have checked the entire string:', original, '=', result)
            loggerGroupEnd()
            return // We have checked the entire string.
        }

        const foundSomething = checkAtIndex(index)
        if (foundSomething) {
            checkRecursively(0) // Start over from the beginning.
        } else {
            checkRecursively(index + 1) // Continue
        }
    }

    function checkAtIndex(index: number) {
        for (const numberAsWord of numbersAsWords) {
            const target = result.substring(index, index + numberAsWord.length)

            if (index + numberAsWord.length > result.length) {
                continue // The word is too long to fit.
            }

            if (target === numberAsWord) {
                logger('Found', numberAsWord, 'at index', index, 'in', result)

                result = result.replace(numberAsWord, wordMap[numberAsWord])
                return true // Break out of loop. Start at index 0 again.
            }
        }
    }
}

const getEveryLineWithNumbersOnly = (input: string[]) => {
    return input.map(replaceWordsWithNumbers)
}

const getEveryLineSum = (input: string[]) => {
    return input.map((line) => {
        const lineWithAllNumbers = replaceWordsWithNumbers(line)

        const digitsOnly = lineWithAllNumbers.replace(/\D/gm, '')

        const firstDigit = digitsOnly[0]
        const lastDigit = digitsOnly[digitsOnly.length - 1]

        const sum = Number(firstDigit + lastDigit) || 0

        return sum
    })
}

const getAllLinesSum = (lineSums: number[]) => {
    return lineSums.reduce((acc, curr) => acc + curr, 0)
}
