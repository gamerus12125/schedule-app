"use client";
import { FC, useEffect } from "react";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { user } from "@/types/user";
import { useRouter } from "next/navigation";

const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<[user]>();
  const [error, setError] = useState("hidden");
  const router = useRouter();

  useEffect(() => {
    axios.get("api/users").then((res) => setData(res.data));
  }, []);

  const registerUser = async (e: any) => {
    e.preventDefault();
    const isAuthed = data?.find(
      (item) => item.name === username || item.email === email
    );
    if (!isAuthed) {
      axios
        .post("api/users", { name: username, mail: email, password: password })
        .catch((err) => setError(""));
    }
    signIn("credentials", {email, password, redirect: true})
  };

  return (
    <div className="mt-10 flex justify-center sm:h-screen">
      <form
        onSubmit={(e) => registerUser(e)}
        className="h-fit rounded border-4 border-gray-700 p-10 content-center grid gap-4 bg-slate-800 sm:max-w-xl"
      >
        <h1 className="text-3xl w-1/3">Регистрация</h1>
        <p className={error}>Такой пользователь уже существует.</p>
        <label>
          <Input
            type="text"
            placeholder="Отображаемое имя"
            value={username}
            onChange={setUsername}
            required={true}
          />
        </label>
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
          <Button type="submit">Зарегистрироваться</Button>
          <Link
            href={"#"}
            className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xm px-5 py-2.5 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Уже зарегистрированы?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
