import classes from "./pass.module.css";
import T_01 from "../invitations/invitation-templates/t-01";
import T_02 from "../invitations/invitation-templates/t-02";
import { useDrag } from "react-dnd";

export default function Pass({ data }) {


  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { id: data._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getTemplate = () => {
    switch (true) {
      case data.template === "t_01":
        return <T_01 data={data} />;
      case data.template === "t_02":
        return <T_02 data={data} />;
    }
  };

  return (
    <div
    className={
          isDragging ? `${classes.pass} ${classes.drag}` : classes.pass
        }
     ref={drag}
    >
      {getTemplate()}
    </div>
  );
}
