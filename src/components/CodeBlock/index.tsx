import './index.css'

import { useEffect, useRef, useState } from 'preact/hooks'

type CodeBlockProps = {
    stringArray: string[]
}

export const CodeBlock = ({ stringArray }: CodeBlockProps) => {
    const isExpandable = stringArray.length > 10
    const [isExpanded, setIsExpanded] = useState(stringArray.length < 10)

    const elementRef = useRef<HTMLPreElement>(null)
    const handleClick = () => {
        setIsExpanded(!isExpanded)

        if (!isExpanded) return

        elementRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        setIsExpanded(stringArray.length < 10)
    }, [stringArray.length])

    return (
        <>
            <pre
                ref={elementRef}
                className={`code-block ${isExpanded ? 'expanded' : ''} ${isExpandable ? 'expandable' : ''}`}
                data-lines={stringArray.length}
            >
                <code>{stringArray.join('\n')}</code>
            </pre>
            {isExpandable && <button onClick={handleClick}>{isExpanded ? 'Show less' : 'Show more'}</button>}
        </>
    )
}
