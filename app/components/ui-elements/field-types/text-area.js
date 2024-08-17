export default function TextAreaField(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        name={props.name}
        id={props.id}
        rows={props.rows}
        cols={props.cols}
      />
    </>
  );
}
