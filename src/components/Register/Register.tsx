"use client";
import { FC, useEffect } from "react";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonLink from "../ui/ButtonLink/ButtonLink";
import { user } from "prisma/prisma-client";

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
      (item) => item.name === username || item.mail === email
    );
    if (!isAuthed) {
      axios
        .post("api/users", { name: username, mail: email, password: password })
        .catch((err) => setError(""));
    }
    signIn("credentials", {email, password, redirect: true}).catch((error) => console.log(error))
  };

  return (
    <div className="mt-10 flex justify-center sm:h-screen">
      <form
        onSubmit={(e) => registerUser(e)}
        className="h-fit rounded border-4 border-gray-700 content-center grid gap-4 bg-slate-800 sm:max-w-xl lg:p-10"
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
        <label className="flex">
          <legend>Принимаю условия лицензионного соглашения</legend>
          <Input type="checkbox" required placeholder=""/>
        </label>
        <div className="flex justify-between">
          <Button type="submit" className="">Зарегистрироваться</Button>
          <ButtonLink
            href={"#"}
          >
            Уже зарегистрированы?
          </ButtonLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
