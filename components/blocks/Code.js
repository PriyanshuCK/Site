import Pre from '../Pre'
export default function Code({ rich_text, language, caption }) {
  return (
    <div className="not-prose my-6">
      <span className="-mb-2 flex flex-row justify-between rounded-t-lg bg-gray-800 px-4 pt-3 text-[#7FDBCA]">
        <span>{language}</span>
        {caption ? <span className="text-sm">{caption}</span> : ''}
      </span>
      <span>
        <Pre codeText={rich_text[0].text.content} language={language} />
      </span>
    </div>
  )
}
