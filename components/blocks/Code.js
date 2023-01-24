import Pre from '../Pre'
export default function Code({ rich_text, language, caption }) {
  return (
    <div className="not-prose my-6">
      <span className="flex flex-row justify-between rounded-t-lg border-b-[1px] border-gray-600 bg-gray-800 px-4 py-3 text-[#7FDBCA]">
        {caption ? <span className="text-sm">{caption}</span> : ''}
      </span>
      <span>
        <Pre>{rich_text[0].text.content}</Pre>
      </span>
    </div>
  )
}
