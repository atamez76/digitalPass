"use client";

import classes from "./event-data.module.css";
import Template from "../invitations/invitation-templates/template";
import { useState } from "react";

export default function EventData(params) {
  const [disabled, setDisabled] = useState(true);
  const [btnLabel, setBtnLabel] = useState("Edit");

  const data = JSON.parse(params.data);

  const formStatus = () => {
    if (disabled === true) {
      setDisabled(false);
      setBtnLabel("Cancel");
    } else if (disabled === false) {
      setDisabled(true);
      setBtnLabel("Edit");
    }
  };

  return (
    <main className={classes.main}>
      <div className={classes.section_header}>
        <h2>Event General Information</h2>
        <button className={classes.btn} onClick={formStatus}>
          {btnLabel}
        </button>
      </div>
      <div className={classes.pageBody}>
        <div className={classes.pass_holder}>
          <div className={classes.pass}><Template template={data}/></div>
        </div>
        <div className={classes.form_holder}></div>
      </div>
     
    </main>
  );
}
