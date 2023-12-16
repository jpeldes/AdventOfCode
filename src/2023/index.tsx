import { Day1 } from './Day1'
import { useInputFile } from './hooks/useInputFile'

export const TwentyTwentyThree = () => {
    const inputDay1 = useInputFile('day1')
    const testInputDay1 = useInputFile('day1', 'test.txt')

    return (
        <div>
            <Day1 input={inputDay1} />
            <Day1 input={testInputDay1} />
        </div>
    )
}
