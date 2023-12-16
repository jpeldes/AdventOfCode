import { useInputFile } from '../hooks/useInputFile'
import { DayTwoPartOne } from './DayTwoPartOne'

export const DayTwo = () => {
    const input = useInputFile('day2')
    const testInput = useInputFile('day2', 'test.txt')

    return (
        <div>
            <h1>Day 2</h1>
            <h3>Day 2 - Part one</h3>
            <DayTwoPartOne input={input} />

            <h3>Day 2 - Part one - with test data</h3>
            <DayTwoPartOne input={testInput} />
        </div>
    )
}
