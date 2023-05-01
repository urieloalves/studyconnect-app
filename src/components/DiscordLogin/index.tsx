import { discordOAuth } from "@/api/ApiClient";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function DiscordLogin() {
  const router = useRouter();

  async function handleClick() {
    const { redirectUrl } = await discordOAuth();
    router.push(redirectUrl);
  }

  return (
    <>
      <Button
        onClick={handleClick}
        type="submit"
        colorScheme="purple"
        width="full"
      >
        Discord Authentication
      </Button>
    </>
  );
}
