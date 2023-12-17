import { useInputFile } from '../hooks/useInputFile'
import { DayFourPartOne } from './DayFourPartOne'

export const DayFour = () => {
    const input = useInputFile('day4')
    const testInput = useInputFile('day4', 'test.txt')

    return (
        <>
            <h1>Day 4</h1>

            <h3>Day 4 - Part one - with test data</h3>
            <DayFourPartOne input={testInput} />

            <h3>Day 4 - Part one</h3>
            <DayFourPartOne input={input} />
        </>
    )
}
