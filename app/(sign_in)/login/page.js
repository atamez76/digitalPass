import "../../globals.css";
import SocialLoginForm from "@/app/components/forms/social-login-form";
import CredentialsLoginForm from "@/app/components/forms/credentials-login-form";
import { auth } from "@/auth";
import Link from "next/link";

export default async function SignIn() {
  const session = await auth();

  return (
    <div className="register-login-form">
      <h2>Log in to your account</h2>
      <h3>You dont have an account? <Link href="/register" className="link">Sing up</Link></h3>
      <SocialLoginForm />
      <div className="break-separator">
        <span>Or with email and password</span>
      </div>
      <CredentialsLoginForm />
    </div>
  );
}
