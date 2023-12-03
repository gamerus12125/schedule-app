import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import {user } from "prisma/prisma-client";
import client from "@/utils/client";


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
        const currentUser = client.user.findUnique({where: {mail: credentials.email, password: credentials.password}})
        if (currentUser) {
          const { password, ...userWithoutPass } = currentUser as unknown as user;
          return userWithoutPass as unknown as User;
        }
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
