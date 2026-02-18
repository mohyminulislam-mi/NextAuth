import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const user = userList.find((u) => u.name == username);
        if (!user) return null;

        const isPasswordOk = user.password == password;
        if (isPasswordOk) return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
