import { useInputFile } from '../hooks/useInputFile'
import { DayOnePartOne } from './DayOnePartOne'
import { DayOnePartTwo } from './DayOnePartTwo'

export const DayOne = () => {
    const inputDayOne = useInputFile('day1')
    const testInputDayOne = useInputFile('day1', 'test.txt')
    const testInputDayOnePartTwo = useInputFile('day1', 'test2.txt')

    const trickyInput = ['one6eightwo']

    return (
        <div>
            <h1>Day 1</h1>
            <DayOnePartOne input={inputDayOne} />
            <h2>Day 1 - Part 2</h2>
            <DayOnePartTwo input={inputDayOne} />

            <h3>Day 1 - Part 1 - with test data</h3>
            <DayOnePartOne input={testInputDayOne} />
            <h3>Day 1 - Part 2 - with test data</h3>
            <DayOnePartTwo input={testInputDayOnePartTwo} />

            <h3>Day 1 - Part 2 - with TRICKY data</h3>
            <DayOnePartTwo input={trickyInput} />
        </div>
    )
}
