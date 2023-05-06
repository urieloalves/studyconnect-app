import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
import { useRouter } from "next/router";

export function CreateGroup() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      courseLink: "",
    },
    onSubmit: async ({ name, description, courseLink }) => {
      try {
        setLoading(true);
        // await createGroup(name, description, courseLink);
        showToast({
          status: "success",
          title: "Group Creation",
          description:
            "Your group was successfully created. You should be able to see a channel for this group on our Discord server.",
        });
        closeModal();
        router.push("/groups");
      } catch (e) {
        showToast({
          status: "error",
          title: "Group Creation",
          description:
            "Something went wrong. Please verify if you provided all fields",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Stack margin="auto" w="400px" justify="center">
      <Text textAlign="center" fontSize="28px">
        Create Group
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="20px">
          <Box>
            <label htmlFor="name">Name</label>
            <Input
              marginTop="10px"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Box>

          <Box>
            <label htmlFor="description">Description</label>
            <Input
              marginTop="10px"
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Box>

          <Box>
            <label htmlFor="courseLink">Course link</label>
            <Input
              marginTop="10px"
              id="courseLink"
              name="courseLink"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.courseLink}
            />
          </Box>

          <Button type="submit" isLoading={loading}>
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
