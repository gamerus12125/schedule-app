"use client";
import { FC } from "react";
import { signOut } from "next-auth/react";
import Button from "../ui/Button/Button";
import { useSession } from "next-auth/react";

const Profile: FC = () => {
  const session = useSession();
  return (
    <div className="h-screen">
      <h1 className="text-center text-2xl">{session.data?.user?.name}</h1>
      <Button type="button" funcClick={() => signOut()}>
        Выйти
      </Button>
    </div>
  );
};

export default Profile;
