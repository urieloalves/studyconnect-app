import { useAuth } from "@/hooks/useAuth";
import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { token } = useAuth();

  if (token) {
    router.push("/groups");
  }
  return (
    <Flex ml="20vw" mt="20vh" direction="column">
      <Text fontSize="40px">
        Connecting students <br /> from any online learning platform
      </Text>
      <Button
        mt="10px"
        w="150px"
        onClick={() => router.push("/login")}
        colorScheme="purple"
      >
        Login
      </Button>
    </Flex>
  );
}
