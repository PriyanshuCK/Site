import { Fragment } from 'react'
import Renderblock from '../Renderblock'
import Richtext from '../Richtext'
export default function Heading1({ rich_text, color, toggle, childrenBlock, id }) {
  return (
    <>
      {toggle ? (
        <div className="not-prose my-6">
          <details className="rounded-2xl p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-gray-800 dark:open:shadow-gray-800/30 dark:open:ring-white/10">
            <summary className="mb-3 text-4xl font-bold leading-12 tracking-tight text-gray-900 dark:text-gray-100">
              <Richtext text={rich_text} color={color} id={id} />
            </summary>
            {childrenBlock?.map((block) => (
              <Fragment key={block.id}>
                <Renderblock block={block} />
              </Fragment>
            ))}
          </details>
        </div>
      ) : (
        <h1>
          <Richtext text={rich_text} id={id} color={color} />
        </h1>
      )}
    </>
  )
}
