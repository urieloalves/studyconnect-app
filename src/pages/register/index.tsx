import DiscordLogin from "@/components/DiscordLogin";
import { Box, Flex } from "@chakra-ui/react";

export default function Register() {
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <DiscordLogin label="Register using Discord" />
      </Box>
    </Flex>
  );
}
