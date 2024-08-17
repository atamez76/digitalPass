"use client";

import InputField from "./field-types/input-field";
import TextAreaField from "./field-types/text-area";
import PickFromGallery from "./field-types/pick-from-gallery-field";


export default function Fields(props) {
 
  const getFields = () => {
    if (props.fieldType === "input") {
      return (
        <InputField
          label={props.label}
          id={props.id}
          name={props.name}
          type={props.type}
          required={props.required}
          accept={props.accept}
        />
      );
    } else if (props.fieldType === "text-area") {
      return (
        <TextAreaField
          label={props.label}
          id={props.id}
          name={props.name}
          rows={props.rows}
          cols={props.cols}
        />
      );
    } else if (props.fieldType === "file") {
      return <PickFromGallery />;
    }
  };

  return <>{getFields()}</>;
}
