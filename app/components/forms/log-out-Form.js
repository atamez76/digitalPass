
import { doLogOut } from "@/app/lib/actions";

export default function LogOutForm() {



  return (
    <form action={doLogOut} >
      <button type="submit" value="logout">LogOut</button>
    </form>
  );
}
