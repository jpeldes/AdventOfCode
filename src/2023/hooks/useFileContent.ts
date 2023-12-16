import { useEffect, useState } from 'preact/hooks'

export const useFileContent = (filePath: string) => {
    if (!filePath) throw new Error('File path is required')

    const [fileContent, setFileContent] = useState('')

    useEffect(() => {
        const getFile = async () => {
            const result = await fetch(filePath)
            const text = await result.text()
            setFileContent(text)
        }

        getFile()
    })

    if (!fileContent) return []

    const linesAsArray = fileContent.split('\n')
    return linesAsArray
}
