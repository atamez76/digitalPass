"use client";
import { useState } from "react";
import classes from "./contact_load.module.css";

export default function ActionButton(props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    props.onClicked(isClicked);
  };

  return (
    <button className={classes.btn_1} onClick={handleClick}>
      {props.label}
    </button>
  );
}
