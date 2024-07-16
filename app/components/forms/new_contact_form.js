import SubmitContactForm from "./submit-contact-form";
import classes from "./contact_load.module.css";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { saveSingleContact } from "@/app/lib/actions";
import { UseMessage } from "@/app/lib/store";
import { useState, useEffect } from "react";
import Flash from "../ui-elements/flash-message";

export default function NewContactForm(props) {
  const [flash, setFlash] = useState(false);
  const newMessage = UseMessage((state) => state.message);
  const clearMessage = UseMessage((state) => state.clearMessage);

  const initialState = {
    message: "",
  };

  const [formState, formAction] = useFormState(
    saveSingleContact.bind(null, { slug: props.slug, event: props.event }),
    initialState
  );

  useEffect(() => {
    if (newMessage) {
      formState.message = newMessage;
    }

    if (formState.message == "Data Updated") {
      setFlash(true);
      nameRef.current.value = null;
      lastnameRef.current.value = null;
      emailRef.current.value = null;
      phoneRef.current.value = null;
      props.onformVisible(true)
    } else if (formState.message != "") {
      setFlash(true);
    }
  }, [newMessage, formState.message]);

  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const clearFlash = () => {
    setFlash(false);
    formState.message = "";
    clearMessage();
  };

  if (flash === true) {
    setTimeout(() => clearFlash(), 5000);
  }

  return (
    <>
    {flash && <Flash message={formState.message} />}
    <form action={formAction} className={classes.form_visible}>
      <div className={classes.control}>
        <label htmlFor="firstName"> First Name</label>
        <input name="firstName" id="firstName" ref={nameRef} required />
      </div>
      <div className={classes.control}>
        <label htmlFor="firstName"> Last Name</label>
        <input name="lastName" id="lastName" required ref={lastnameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="firstName"> Email </label>
        <input type="email" name="email" id="email" required ref={emailRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="phone"> Phone </label>
        <input type="number" name="phone" id="phone" required ref={phoneRef} />
      </div>
      <div className={classes.control}>
        <SubmitContactForm label={"+"} class={classes.btn_2} />
      </div>
    </form>
    </>
  );
}
