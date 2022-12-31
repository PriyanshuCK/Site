import Richtext from '../Richtext'
export default function Paragraph({ rich_text, color, id }) {
  return (
    <p
      className={`${color.length < 8 ? `text-${color}Notion` : `bg-${color.split('_', 1)}Notion`}`}
    >
      <Richtext text={rich_text} id={id} color={color} />
    </p>
  )
}
