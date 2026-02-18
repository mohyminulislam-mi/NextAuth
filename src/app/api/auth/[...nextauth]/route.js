import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

const userList = [
  { name: "munna", password: "1234" },
  { name: "milon", password: "5678" },
  { name: "mithila", password: "91011" },
];
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Login",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Your Email"},
        password: { label: "Password", type: "password" , placeholder: "Enter Your Password"},
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // const user = userList.find((u) => u.name == username);
        const user = await dbConnect("users").findOne({email})
        if (!user) return null;

        const isPasswordOk = await bcrypt.compare(password, user.password)
        if (isPasswordOk) return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
