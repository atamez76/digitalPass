import { doSocialLogin } from "@/app/lib/actions";

export default function LoginForm() {
  return (
    <form action={doSocialLogin}>
      <button name="action" value="GitHub" type="submit">
        Signin with GitHub
      </button>
    </form>
  );
}
