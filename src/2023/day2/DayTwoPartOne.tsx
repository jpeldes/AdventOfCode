import { CodeBlock } from '../../components/CodeBlock'

type Props = { input: string[] }

export const DayTwoPartOne = ({ input }: Props) => {
    const { games, sum } = parseInput(input)

    const possibleGames = games
        .filter((game) => game.isPossible)
        .map((game) => JSON.stringify(game, undefined, 2).replace(/\n/gm, '\t').replace(/\"/g, ''))
    return (
        <article>
            <h3>Sum</h3>
            <pre>
                <code>{sum}</code>
            </pre>

            <h3>Possible games</h3>
            <CodeBlock stringArray={possibleGames} />
            <p>Input</p>
            <pre>
                <code>{input.join('\t\t')}</code>
            </pre>
        </article>
    )
}

const MAXIMUM = {
    red: 12,
    green: 13,
    blue: 14,
}

type ColorType = 'red' | 'green' | 'blue'

interface Cube {
    count: number
    color: ColorType
    isPossible: boolean
}

interface Game {
    id: number
    isPossible: boolean
    cubes: Cube[]
}

const parseInput = (input: string[]) => {
    const games = input.map(parseGame)

    const sum = games.reduce((result, game) => {
        if (!game.isPossible) return result

        return result + game.id
    }, 0)

    return {
        games,
        sum,
    }
}

const parseGame = (line: string): Game => {
    const [gameString, allCubesString] = line.split(':')

    const [_match, gameNumberString = '0'] = /Game (\d+)/.exec(gameString) ?? []
    const id = Number(gameNumberString)

    const cubes = parseReveals(allCubesString)

    const isGamePossible = cubes.every((cube) => cube.isPossible)

    return {
        id,
        isPossible: isGamePossible,
        cubes,
    }
}

const parseReveals = (allCubesString: string) => {
    const regex = new RegExp(/(\d+) (\w+)/, 'gim')

    let cubes: Cube[] = []
    let match: RegExpExecArray | null = regex.exec(allCubesString)

    while (match != null) {
        const [_matchedString, countMatch, colorMatch] = match

        const count = Number(countMatch)
        const color = colorMatch as ColorType
        const isPossible = count <= MAXIMUM[color]

        cubes.push({
            count,
            color,
            isPossible,
        })

        // Continue
        match = regex.exec(allCubesString)
    }

    return cubes
}
