export default function InputField(props) {
  if (props.required) {
    return (
      <>
        <label htmlFor={props.id}>{props.label}</label>
        <input name={props.name} id={props.id} type={props.type} required />
      </>
    );
  } else {
    return (
      <>
        <label htmlFor={props.id}>{props.label}</label>
        <input name={props.name} id={props.id} type={props.type} />
      </>
    );
  }
}
