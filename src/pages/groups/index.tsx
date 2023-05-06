import { CreateGroup } from "@/components/CreateGroup";
import { useModal } from "@/hooks/useModal";
import { SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Groups() {
  const router = useRouter();
  const { openModal } = useModal();

  const groups: any[] = [];

  return (
    <Flex
      padding="10px"
      maxW="1200px"
      position="relative"
      flexDir="column"
      mx="auto"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="30px">My Groups</Text>

        <Flex>
          <Button
            mr="10px"
            onClick={() => {
              router.push("search");
            }}
          >
            <Tooltip label={"Search groups"}>
              <SearchIcon />
            </Tooltip>
          </Button>

          <Button onClick={() => openModal(<CreateGroup />)}>
            Create group
          </Button>
        </Flex>
      </Flex>

      <Stack mt="80px" direction="row" spacing="20px">
        {groups.length === 0 && (
          <Text>
            You currently have no groups - you can search for groups or create
            your own
          </Text>
        )}
        {groups.map((group) => (
          <>{group}</>
        ))}
      </Stack>
    </Flex>
  );
}
