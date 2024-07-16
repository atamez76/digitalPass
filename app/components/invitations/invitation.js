"use client";
import classes from "./invitation.module.css";
import T_01 from "./invitation-templates/t-01";
import T_02 from "./invitation-templates/t-02";

export default function Invite({ data }) {
 
  const getTemplate = () => {
    switch (true) {
      case data.Name === "t_01":
        return <T_01 data={data} />;
      case data.Name === "t_02":
        return <T_02 data={data} />;
    }
  }

  return <div className={classes.pass}>{getTemplate()}</div>;
} 
