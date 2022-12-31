import { useState, useRef } from 'react'
import { useEffect } from 'react'
import Prism from 'prismjs'

require('prismjs/components/prism-javascript')
require('prismjs/components/prism-css')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-c')
require('prismjs/components/prism-cpp')

const Pre = (props) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  const textInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.textContent)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative rounded-b-lg bg-gray-800 text-sm font-normal text-gray-200"
    >
      <div className="overflow-x-auto px-4 py-3">
        {hovered && (
          <button
            aria-label="Copy code"
            type="button"
            className={`absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800${
              copied
                ? 'border-primary-400 focus:border-primary-400 focus:outline-none'
                : 'border-gray-300'
            }`}
            onClick={onCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className={copied ? 'text-primary-400' : 'text-gray-300'}
            >
              {copied ? (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </>
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </>
              )}
            </svg>
          </button>
        )}

        <pre>
          <code className="language-cpp">{props.codeText}</code>
        </pre>
      </div>
    </div>
  )
}

export default Pre
