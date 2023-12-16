import { DayOne } from './Day1'
import { DayOnePartTwo } from './Day1/PartTwo'
import { useInputFile } from './hooks/useInputFile'

export const TwentyTwentyThree = () => {
    const inputDayOne = useInputFile('day1')
    const testInputDayOne = useInputFile('day1', 'test.txt')
    const testInputDayOnePartTwo = useInputFile('day1', 'test2.txt')

    return (
        <div>
            <h1>Day 1</h1>
            <DayOne input={inputDayOne} />
            <h1>Part 2</h1>
            <DayOnePartTwo input={inputDayOne} />

            <h1>Day 1 (test data)</h1>
            <DayOne input={testInputDayOne} />
            <h1>Part 2(test data)</h1>
            <DayOnePartTwo input={testInputDayOnePartTwo} />
        </div>
    )
}
