
import { doLogOut } from "@/app/lib/actions";
import classes from "./contact_load.module.css"

export default function LogOutForm() {

  return (
    <form action={doLogOut} className={classes.log_out_form} >
      <button type="submit" value="logout">LogOut</button>
    </form>
  );
}
