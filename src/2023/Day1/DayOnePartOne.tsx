export const DayOnePartOne = ({ input }: { input: string[] }) => {
    const lineSums = getEveryLineSum(input)

    const sum = lineSums.reduce((acc, curr) => acc + curr, 0)

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

const getEveryLineSum = (input: string[]) => {
    return input.map((line) => {
        const digitsOnly = line.replace(/\D/gm, '')
        const firstDigit = digitsOnly[0]
        const lastDigit = digitsOnly[digitsOnly.length - 1]
        const sum = Number(firstDigit + lastDigit)
        return sum
    })
}
