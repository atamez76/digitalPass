import Account from "./account";
import classes from "./header.module.css";
import User from "./user";


export default function Header() {
  
  return (
    <div className={classes.header}>
      <div  className={classes.header_wrapper}>
        <div className={classes.account}>
          <p>LINUMCO</p>
        </div>
        <div className={classes.settings}>
          <Account account={"Linum"} />
          <User user={"Adrian"} />
        </div>
      </div>
    </div>
  );
}
