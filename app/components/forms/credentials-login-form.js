import classes from "./contact_load.module.css"
import SubmitContactForm from "./submit-contact-form";
import { doCredentialsLogin } from "@/app/lib/actions";

export default function CredentialsLoginForm() {
  return (
    <form action={doCredentialsLogin}>
      <div className={classes.controls_column}>
        <label htmlFor="email"> Email </label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className={classes.controls_column}>
        <label htmlFor="password"> password </label>
        <input id="password" name="password" type="password" required />
      </div>
      <div>
        <SubmitContactForm
          label={"Continue"}
          class={classes.btn_3}
          disabled={false}
        />
      </div>
    </form>
  );
}
