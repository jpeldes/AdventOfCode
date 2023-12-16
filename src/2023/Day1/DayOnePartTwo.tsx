export const DayOnePartTwo = ({ input }: { input: string[] }) => {
    if (!input || !input.length) return null

    const lineSums = getEveryLineNumbers(input)

    const sum = getAllLinesSum(lineSums)

    return (
        <div>
            <pre>
                <code>{input.join(' + ')}</code>
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

const parseLineForNumbers = (line: string) => {
    const numbersAsWords = Object.keys(wordMap) as NumberAsWord[]

    const patternsToMatch = ['\\d', ...numbersAsWords]
    const matches = matchAllPatternsOneByOne(patternsToMatch)

    const firstMatch = matches?.[0]
    const firstNumber = getWordAsNumber(firstMatch)

    const lastMatch = matches?.[matches.length - 1]
    const lastNumber = getWordAsNumber(lastMatch)

    return Number(String(firstNumber) + String(lastNumber))

    // Helpers for parser

    function matchAllPatternsOneByOne(patterns: string[]) {
        const foundMatches = patterns.reduce((currentMatches, pattern) => {
            return [...currentMatches, ...findMatches(pattern)]
        }, [] as { index: number; value: string }[])

        const orderedMatches = foundMatches.sort((a, b) => a.index - b.index)
        const foundNumbersOrdered = orderedMatches.map((match) => match.value)

        return foundNumbersOrdered
    }

    function findMatches(pattern: string) {
        const regex = new RegExp(pattern, 'gim')

        let matches = []
        let match: RegExpExecArray | null | undefined = undefined

        while (match !== null) {
            match = regex.exec(line)

            if (!match) break

            matches.push({ index: match.index, value: match[0] })
        }

        return matches
    }

    function getWordAsNumber(word?: NumberAsWord | string) {
        if (!word) return 0

        const isNumberAsWord = word in wordMap
        const number = wordMap[word as NumberAsWord]
        return isNumberAsWord ? number : word
    }
}

const getEveryLineNumbers = (input: string[]) => input.map(parseLineForNumbers)

const getAllLinesSum = (lineSums: number[]) => lineSums.reduce((acc, curr) => acc + curr, 0)
