import Richtext from '../Richtext'
export default function ListItem({ rich_text, color, id }) {
  return (
    <li
      className={`${
        color.length < 8 ? `text-${color}Notion` : `bg-${color.split('_', 1)}Notion`
      } marker:text-primary-400`}
    >
      <Richtext text={rich_text} id={id} color={color} />
    </li>
  )
}
