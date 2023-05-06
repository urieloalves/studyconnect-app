import { useAuth } from "@/hooks/useAuth";
import {
  Button,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
  const { token } = useAuth();

  return (
    <Flex
      padding="30px 10px 30px 10px"
      margin="auto"
      maxWidth="1200px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text
        fontSize="20px"
        fontWeight="700"
        mr="20px"
        cursor="pointer"
        onClick={() => router.push(token ? "/groups" : "/")}
      >
        StudyConnect
      </Text>

      <Stack direction="row" spacing="16px" alignItems="center">
        {token ? (
          <ChakraLink onClick={() => router.push("/groups")}>
            My Groups
          </ChakraLink>
        ) : (
          <>
            <ChakraLink onClick={() => router.push("/")}>Home</ChakraLink>
            <ChakraLink onClick={() => router.push("/login")}>Login</ChakraLink>
            <ChakraLink onClick={() => router.push("/register")}>
              Register
            </ChakraLink>
          </>
        )}
      </Stack>
    </Flex>
  );
}
