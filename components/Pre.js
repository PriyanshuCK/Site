import { useEffect } from 'react'
import Prism from 'prismjs'

require('prismjs/components/prism-c')
require('prismjs/components/prism-cpp')

const Pre = ({ children }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <div className="relative rounded-b-lg bg-gray-800 text-sm font-normal text-gray-200">
      <div className="overflow-x-auto px-4 py-3">
        <pre>
          <code className="language-cpp">{children}</code>
        </pre>
      </div>
    </div>
  )
}

export default Pre
