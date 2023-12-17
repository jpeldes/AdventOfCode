import { CodeBlock } from '../../components/CodeBlock'

type Game = {
    id: number
    isWinning: boolean
    score: number
    winningNumbers: number[]
    scratchedNumbers: number[]
    winningScratchedNumbers: number[]
}

export const DayFourPartOne = ({ input }: { input: string[] }) => {
    const games = parseInput(input)
    const result = getScoreSum(games)

    return (
        <div>
            <p>Sum of winning games</p>
            <pre>
                <code>{result}</code>
            </pre>
            <CodeBlock stringArray={input} />
        </div>
    )
}

const getScoreSum = (games: Game[]) => games.reduce((sum, game) => sum + game.score, 0)

const parseInput = (input: string[]) => input.map(parseLine)

const patternWhitespace = /\s+/gm

const parseLine = (line: string) => {
    let game = {} as Game

    const [gameString, cards] = line.split(':')
    game.id = Number(gameString.match(/\d+/g))

    const [winningCards, scratchedCards] = cards.split('|')
    game.winningNumbers = winningCards
        .trim()
        .split(patternWhitespace)
        .map((c) => Number(c))
    game.scratchedNumbers = scratchedCards
        .trim()
        .split(patternWhitespace)
        .map((c) => Number(c))

    game.winningScratchedNumbers = game.scratchedNumbers.filter((card) => game.winningNumbers.includes(card))

    game.isWinning = game.winningScratchedNumbers.length > 0

    game.score = (() => {
        if (game.isWinning) {
            const winningNumbersCount = game.winningScratchedNumbers.length
            if (winningNumbersCount === 1) return 1
            return Math.pow(2, winningNumbersCount - 1)
        } else {
            return 0
        }
    })()

    return game
}
