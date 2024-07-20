"use client"
import classes from "./contact_load.module.css";
import SubmitContactForm from "./submit-contact-form";
import { useFormState } from "react-dom";
import { CreateAccount } from "@/app/lib/actions";

export default function RegisterForm() {
  const [formState, formAction] = useFormState(CreateAccount, "");

  return (
    <div className={classes.register_form}>
      <h2> Register Here </h2>
      <form action={formAction} >
        <div className={classes.controls_column}>
          <label htmlFor="email"> Email </label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className={classes.controls_column}>
          <label htmlFor="FName"> First Name </label>
          <input id="FName" name="FName" required />
        </div>
        <div className={classes.controls_column}>
          <label htmlFor="LName"> Last name </label>
          <input id="LName" name="LName" required />
        </div>
        <div className={classes.controls_column}>
          <label htmlFor="pws"> Password </label>
          <input id="pws" name="pws" type="password" required />
        </div>
        <div className={classes.controls_column}>
          <label htmlFor="pws_2"> Repeat Password </label>
          <input id="pws_2" name="pws_2" type="password" required />
        </div>
        <div>
          <SubmitContactForm
            label={"Register"}
            class={classes.btn_3}
            disabled={false}
          />
        </div>
      </form>
      {formState.message}
    </div>
  );
}
