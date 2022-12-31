import Paragraph from './Paragraph'
export default function Callout({ emoji, rich_text, color, id }) {
  return (
    <div className="my-2 rounded-2xl bg-primary-50 p-6 shadow-lg shadow-primary-300/30 ring-1 ring-black/5 prose-p:m-0 dark:bg-gray-800 dark:shadow-gray-800/30 dark:ring-white/10 sm:mx-auto sm:w-4/5">
      <span className="float-left mr-2 rounded-full bg-primary-100 p-2 text-3xl dark:bg-gray-700">
        {emoji}
      </span>
      <Paragraph rich_text={rich_text} color={color} id={id} />
    </div>
  )
}
