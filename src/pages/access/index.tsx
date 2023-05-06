import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Access() {
  const router = useRouter();
  const { getUser, updateToken, token } = useAuth();

  useEffect(() => {
    const newToken = router.query["token"] as string;
    if (newToken === undefined || newToken === null || newToken === token)
      return;

    updateToken(newToken as string);
    getUser();
  }, [router.query, getUser, updateToken, token]);

  return (
    <>
      <h1>Access</h1>
    </>
  );
}
