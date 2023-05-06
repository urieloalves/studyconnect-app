import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Stack, Text } from "@chakra-ui/layout";

import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { Group } from "@/models";
import { GroupCard } from "@/components/GroupCard";
import { useRouter } from "next/router";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Flex
      padding="10px"
      maxW="1200px"
      position="relative"
      flexDir="column"
      mx="auto"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="30px" alignSelf="center">
          Search Groups
        </Text>

        <Flex>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a group"
            w="300px"
            mr="20px"
          />
          <Button onClick={() => console.log("create group")}>
            Create group
          </Button>
        </Flex>
      </Flex>

      <Stack mt="80px" direction="row" spacing="20px">
        {groups.length === 0 ? (
          <Text>No results for the current search.</Text>
        ) : (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              user={user!!}
              onButtonClick={() => router.push("/groups")}
            />
          ))
        )}
      </Stack>
    </Flex>
  );
}
