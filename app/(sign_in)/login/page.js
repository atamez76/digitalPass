import "../../globals.css";
import LoginForm from "@/app/components/forms/login-form";
import { auth } from "@/auth";

export default async function SignIn() {
  const session = await auth();

  return (
    <>
      <LoginForm />
    </>
  );
}
