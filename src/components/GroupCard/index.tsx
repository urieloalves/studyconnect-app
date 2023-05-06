import {
  Card,
  CardBody,
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Group, User } from "../../models";
import { useState } from "react";

interface GroupCardProps {
  group: Group;
  user: User;
  onButtonClick: () => void;
}

export function GroupCard({ group, user, onButtonClick }: GroupCardProps) {
  const [loading, setLoading] = useState(false);

  const isUserInGroup = false;

  async function handleClick(): Promise<void> {
    console.log("handleClick");
  }

  return (
    <Card
      width="300px"
      height="200px"
      border="2px solid"
      borderColor="blue.100"
    >
      <CardBody display="flex" flexDirection="column" bgColor="black.900">
        <Stack flexGrow={1}>
          <Tooltip label={group.name}>
            <Heading
              size="md"
              color="white"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {group.name}
            </Heading>
          </Tooltip>

          <Tooltip label={group.description}>
            <Text
              color="white"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {group.description}
            </Text>
          </Tooltip>
        </Stack>

        <Stack>
          <Divider borderColor="blue.100" />
          <Flex justify="space-between">
            <Link href={group.courseLink} color="white" isExternal>
              Course
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Flex>

          <Button isLoading={loading} w="100%" onClick={handleClick}>
            {isUserInGroup ? "Leave" : "Join"}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}
