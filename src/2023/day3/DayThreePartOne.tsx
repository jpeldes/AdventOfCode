import { CodeBlock } from '../../components/CodeBlock'

type Props = {
    input: Grid
}

export const DayThreePartOne = ({ input }: Props) => {
    const foundMatches = parseInput(input)
    const { cleanNumbers, engineParts } = parseFoundNumbers(foundMatches, input)

    return (
        <>
            <p>
                Values surrounded by <code>.</code>
            </p>
            <pre>
                <code>
                    Sum {cleanNumbers.reduce((sum, current) => sum + current, 0)} = {cleanNumbers.join(' + ')}
                </code>
            </pre>
            <p>Values adjacent to a symbol (and is considered an Engine Part)</p>
            <pre>
                <code>
                    Sum {engineParts.reduce((sum, current) => sum + current, 0)} = {engineParts.join(' + ')}
                </code>
            </pre>
            <p>Input</p>
            <CodeBlock stringArray={input} />
        </>
    )
}

type Match = {
    value: number
    rowIndex: number
    colIndex: number
}

type Grid = string[]

const parseInput = (grid: Grid) => {
    const foundMatches: Match[] = []

    grid.forEach((rowString, rowIndex) => {
        const regex = /(\d+)/gm

        let match: RegExpExecArray | null
        while ((match = regex.exec(rowString)) != null) {
            const colIndex = match.index
            const value = Number(match[0])

            foundMatches.push({
                value,
                rowIndex,
                colIndex,
            })
        }
    })

    return foundMatches
}

const parseFoundNumbers = (foundNumbers: Match[], grid: Grid) => {
    const cleanNumbers: number[] = [] // These numbers are surrounded by dots
    const engineParts: number[] = [] // These numbers are in contact with a symbol that is not a dot.

    foundNumbers.forEach((match) => {
        const isSurroundedByDots = isNumberSurroundedByDots(match, grid)
        if (isSurroundedByDots) {
            cleanNumbers.push(match.value)
        } else {
            engineParts.push(match.value)
        }
    })

    return {
        engineParts,
        cleanNumbers,
    }
}

const isNumberSurroundedByDots = (match: Match, grid: Grid) => {
    return checkRows(match, grid) && checkCols(match, grid)
}

const checkRows = (match: Match, grid: Grid) => {
    const { value, rowIndex, colIndex } = match

    const from = colIndex - 1
    const to = colIndex + String(value).length + 1

    const snippetOfRowBefore = (grid[rowIndex - 1] || '').substring(from, to)
    const snippetOfRowAfter = (grid[rowIndex + 1] || '').substring(from, to)

    return checkIfAllDots(snippetOfRowBefore) && checkIfAllDots(snippetOfRowAfter)
}

/**
 * @todo Oops. This function is unnecessary(ily complex).
 * Can just check all 3 rows from -1 to +1.
 * Currently only testing top and bottom rows like that.
 */
const checkCols = (match: Match, grid: Grid) => {
    const { value, rowIndex, colIndex } = match

    const colLeftAbove = getCell(grid, rowIndex - 1, colIndex - 1)
    const colLeftCurrent = getCell(grid, rowIndex, colIndex - 1)
    const colLeftBelow = getCell(grid, rowIndex + 1, colIndex - 1)
    const colLeftString = colLeftAbove + colLeftCurrent + colLeftBelow

    const colRightAbove = getCell(grid, rowIndex - 1, colIndex + String(value).length)
    const colRightCurrent = getCell(grid, rowIndex, colIndex + String(value).length)
    const colRightBelow = getCell(grid, rowIndex + 1, colIndex + String(value).length)
    const colRightString = colRightAbove + colRightCurrent + colRightBelow

    return checkIfAllDots(colLeftString) && checkIfAllDots(colRightString)
}

const getCell = (grid: Grid, rowIndex: number, colIndex: number) => {
    try {
        return grid[rowIndex][colIndex] || '.' // If Column is out of bounds, return a dot
    } catch {
        return '.' // If Row is out of bounds, return a dot
    }
}

const checkIfAllDots = (snippet: string) => {
    return snippet === '.'.repeat(snippet.length)
}
