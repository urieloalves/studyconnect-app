import DiscordLogin from "@/components/DiscordLogin";
import { Box, Flex } from "@chakra-ui/react";

export default function Register() {
  return (
    <Flex h="fit-content" justify="center">
      <Box mt="60px" p={6} rounded="md" w="fit-content">
        <DiscordLogin label="Register using Discord" />
      </Box>
    </Flex>
  );
}
