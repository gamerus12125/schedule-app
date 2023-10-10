import { FC } from "react";
import { signIn, useSession } from "next-auth/react";
import ButtonLink from "../ui/ButtonLink/ButtonLink";
import Button from "../ui/Button/Button";

const Navigation: FC = () => {
  const session = useSession();
  return (
    <nav className="flex gap-10 m-5 p-5 rounded-md dark: bg-purple-600">
      {session.status !== "authenticated"? <><ButtonLink href={"/register"}>Регистрация</ButtonLink> <ButtonLink href="/signin">Вход</ButtonLink></>: <ButtonLink href="/profile">Профиль</ButtonLink>}
      {session.status === "authenticated" ? <ButtonLink href="/tables">Таблицы</ButtonLink> : ""}
    </nav>
  );
};

export default Navigation;
