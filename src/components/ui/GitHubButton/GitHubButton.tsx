import { signIn } from "next-auth/react";
import { FC } from "react";
import { useSearchParams } from "next/navigation";

const GitHubButton: FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  return <button onClick={() => signIn("github", {callbackUrl})}>Войти через GitHub</button>;
};

export default GitHubButton;
