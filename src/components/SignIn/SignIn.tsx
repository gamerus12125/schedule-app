"use client";
import { FC, use } from "react";
import Link from "next/link";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("hidden");
  const router = useRouter();
  const session = useSession()

  const handleSubmit = (e: any) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password
    });
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/profile")
    }
  }, [session])
  return (
    <div className="mt-10 flex justify-center h-screen">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-xl h-fit rounded border-4 border-gray-700 p-10 content-center grid gap-4 bg-slate-800"
      >
        <h1 className="text-3xl w-1/3">Вход</h1>
        <p className={error}>Неправильный логин или пароль.</p>
        <label>
          <Input
            type="email"
            placeholder="Почта"
            value={email}
            onChange={setEmail}
            required={true}
          />
        </label>
        <label>
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={setPassword}
            required={true}
          />
        </label>
        <div className="flex">
          <Button type="submit">Войти</Button>
          <Link
            href={"/register"}
            className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xm px-5 py-2.5 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Ещё не зарегистрированы?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
