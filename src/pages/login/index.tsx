import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import DiscordLogin from "@/components/DiscordLogin";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { getAccessToken } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await getAccessToken(values);
    },
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>

            <Button type="submit" colorScheme="purple" width="full">
              Login
            </Button>

            <DiscordLogin />

            <Text>
              New? <Link href="/register">Create an account?</Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
