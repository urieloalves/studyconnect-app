import { useAuth } from "@/hooks/useAuth";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      await registerUser({
        name: values.name as string,
        email: router.query["email"] as string,
        password: values.password as string,
        discord_id: router.query["discord_id"] as string,
        discord_username: router.query["discord_username"] as string,
      });
    },
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Discord ID</FormLabel>
              <Input
                id="discordId"
                name="discordId"
                type="text"
                variant="filled"
                value={router.query["discord_id"]}
                disabled
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Discord username</FormLabel>
              <Input
                id="discordUsername"
                name="discordUsername"
                type="text"
                variant="filled"
                value={router.query["discord_username"]}
                disabled
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                value={router.query["email"]}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.name}
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
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
