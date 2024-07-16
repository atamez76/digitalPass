"use client";
import { useFormStatus } from "react-dom";
import Loader from "../ui-elements/loader";
import classes from "./contact_load.module.css";

export default function SubmitContactForm(props) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={props.class} disabled={props.disabled ? true : pending} >
      {pending ? <Loader /> : props.label}
    </button>
  );
}
