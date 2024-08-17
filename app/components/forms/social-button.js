"use client";
import Image from "next/image";

import classes from "./contact_load.module.css";

export default function SocialAutButton(props) {
  return (
    <button
      className={classes.btn_social_auth}
      name={props.name}
      value={props.vlue}
      type="submit"
    >
      <div className={classes.btn_social_auth_content}>
        <Image
          src={props.image}
          width={20}
          height={20}
          alt="gitHub_icon_white"
        />
        {props.label}
      </div>
    </button>
  );
}
