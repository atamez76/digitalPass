import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      authorization: {
        params: {
          prompt: "concent",
          access_type: "offline",
          respomse_type: "code",
        },
      },
    }),
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;
        try {
          const user = {
            name: "Adrian",
            email: "adrian.tamez@linum.mx",
            password:
              "$2a$05$D4o6jw/dS7d16JaZi9s46OKq2pL8pUN3xbQ.NtLVxpf9oC2MRYlfW",
          };
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Incorrect Email or Password");
            }
          }
        } catch (err) {
          if (err) {
            throw new Error(err);
          }
        }
      },
    }),
  ],
});
