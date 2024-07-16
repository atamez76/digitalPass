import F01 from "./f01";
import F02 from "./f02";

export default function Form(props) {
  switch (true) {
    case props.template.template === "t_01":
      return (
        <F01
          eventList={props.eventList}
          onMapVisible={props.onMapVisible}
          template={props.template}
          readOnly = {props.readOnly}
        />
      );
    case props.template.template === "t_02":
      return (
        <F02
          eventList={props.eventList}
          onMapVisible={props.onMapVisible}
          template={props.template}
          readOnly = {props.readOnly}
        />
      );
  }
}
