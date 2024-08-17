import { doSocialLogin } from "@/app/lib/actions";
import SocialAutButton from "./social-button";

export default function SocialLoginForm() {
  return (
    <form action={doSocialLogin}>
      <SocialAutButton
        name={"action"}
        value={"GitHub"}
        label={"GitHub"}
        image={"https://digipass-main.s3.amazonaws.com/github-mark.png"}
      />
        <SocialAutButton
        name={"action"}
        value={"Goolge"}
        label={"Google"}
        image={"https://digipass-main.s3.amazonaws.com/Google_icon.png"}
      />
    </form>
  );
}
