import { useInputFile } from '../hooks/useInputFile'
import { DayThreePartOne } from './DayThreePartOne'

export const DayThree = () => {
    const input = useInputFile('day3')
    const testInput = useInputFile('day3', 'test.txt')

    return (
        <div>
            <h1>Day 3</h1>

            <h3>Day 3 - Part one</h3>
            <DayThreePartOne input={input} />

            <h3>Day 3 - Part one - with test data</h3>
            <DayThreePartOne input={testInput} />
        </div>
    )
}
