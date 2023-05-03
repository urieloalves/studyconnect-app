import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Access() {
  const router = useRouter();
  const { getUser, addTokenToHeader } = useAuth();

  useEffect(() => {
    const token = router.query["token"];
    if (token === undefined) return;
    addTokenToHeader(token as string);
    getUser();
  }, [router.query, getUser, addTokenToHeader]);

  return (
    <>
      <h1>Access</h1>
    </>
  );
}
