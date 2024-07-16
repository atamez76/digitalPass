import classes from "./contact_load.module.css";
import SubmitContactForm from "./submit-contact-form";
import { useFormState } from "react-dom";
import { BulkSendNotifications } from "@/app/lib/actions";
import { UseMessage } from "@/app/lib/store";
import { useEffect } from "react";

export default function BulkSend(props) {
  const newMessage = UseMessage((state) => state.setMessage);

  const [formState, formAction] = useFormState(BulkSendNotifications, "");

  useEffect(()=>{
    if (formState.message) {
      newMessage(formState.message);
      props.onSendCompletion(false)
    }
  },[formState.message])
 

  return (
    <>
      <p className={classes.paragrapth}>
        This action will send all unsent invitations
      </p>
      <form className={classes.form_visible} action={formAction}>
        <p>Select Chanel</p>
        <div className={classes.control}>
          <input type="radio" id="email" name="channel" value="email" /> 
          <label htmlFor="email">Email</label>
        </div>
        <div className={classes.control}>
          <input type="radio" id="sms" name="channel" value="sms" /> 
          <label htmlFor="sms">SMS</label>
        </div>
        <div className={classes.control}>
          <input type="radio" id="whatsapp" name="channel" value="whatsapp" /> 
          <label htmlFor="whatsapp">Whatsapp</label>
        </div>
        <input id="slug" name="slug" defaultValue={props.slug} hidden />
        <div className={classes.control}>
          <SubmitContactForm label={"Send"} class={classes.btn_2} />
        </div>
      </form>
    </>
  );
}
