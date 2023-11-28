import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { user } from "prisma/prisma-client";
import axios from "axios";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Почта и пароль",
      credentials: {
        email: {
          label: "Почта",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const users = await axios
          .get(`${process.env.NEXTAUTH_URL}/api/users`)
          .then((data) => data.data);

        const currentUser: user | undefined = users.find(
          (user: user) => user.mail === credentials?.email
        );
        if (currentUser && currentUser.password === credentials?.password) {
          const { password, ...userWithoutPass } = currentUser;
          return userWithoutPass as unknown as User;
        }
        console.log("error");
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};
