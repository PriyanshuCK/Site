import Richtext from '../Richtext'
export default function Todo({ rich_text, color, checked, id }) {
  return (
    <div>
      <label htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          defaultChecked={checked}
          className="rounded-sm text-primary-500 accent-primary-500 focus:ring-primary-500"
        />{' '}
        <Richtext text={rich_text} color={color} id={id} />
      </label>
    </div>
  )
}
