import { useFileContent } from './useFileContent'

export const useInputFile = (dayFolderName: string, filename: string = 'input.txt') => {
    return useFileContent(`/inputs/2023/${dayFolderName}/${filename}`)
}
