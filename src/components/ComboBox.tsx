export default function ComboBox({items,value,onChange}:{
  items:string[]
  value:string
  onChange:(v:string)=>void
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option key='default' value="">Show all</option>
      {items.map(item => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  )
} /* End of ComboBox */