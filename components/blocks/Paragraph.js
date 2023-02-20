import Richtext from '../Richtext'
export default function Paragraph({ rich_text, color, id }) {
  return (
    <p>
      <Richtext text={rich_text} id={id} color={color} />
    </p>
  )
}
