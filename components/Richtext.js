import Link from 'next/link'

export default function Richtext({ text, id }) {
  if (!text) {
    return null
  }
  return text.map((value) => {
    const {
      annotations: { bold, italic, strikethrough, underline, code, color },
      text,
    } = value
    return (
      <span
        key={id + text.content}
        className={[
          bold ? 'font-bold' : '',
          code
            ? 'rounded-md bg-gray-100 px-1 py-1 font-mono text-primary-500 dark:bg-gray-700'
            : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline decoration-primary-500' : '',
          color !== 'default'
            ? `${color.length < 8 ? `text-${color}Notion` : `bg-${color.split('_', 1)}Notion`}`
            : `text-${color}Notion`,
        ].join(' ')}
      >
        {text.link ? (
          <Link href={text.link.url} className="text-primary-500 hover:text-primary-600">
            {text.content}
          </Link>
        ) : (
          text.content
        )}
      </span>
    )
  })
}
