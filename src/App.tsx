import * as React from "react";
import Create from "./Create";

import {
  Container,
  Stack,
  Card,
  CardBody,
  HStack,
  Text,
  Link,
  Icon,
  VStack,
  Spacer,
  Divider,
  Show,
} from "@chakra-ui/react";

import { FaGithub } from "react-icons/fa";
import { TbClockBolt } from "react-icons/tb";
import View from "./View";

export default function App() {
  const currentUrl = new URL(window.location.href);

  let body: JSX.Element | undefined;
  if (currentUrl.pathname === "/") {
    body = <Create />;
  } else if (currentUrl.pathname === "/view") {
    body = <View />;
  } else {
    body = undefined;

    // Redirect to main page
    React.useEffect(() => {
      currentUrl.pathname = "/";
      window.location.href = currentUrl.toString();
    }, []);
  }

  return (
    <Container maxW="4xl" p={6}>
      <Stack spacing={8}>
        <HStack>
          <HStack spacing={3}>
            <Icon as={TbClockBolt} boxSize={12} />
            <VStack spacing={0} align="flex-start">
              <Text fontSize="3xl" as="b" lineHeight={1}>
                Timebin
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Share encrypted content that can only be decrypted at a certain
                time
              </Text>
            </VStack>
          </HStack>
          <Spacer />
          <Link
            href="https://github.com/fabianlindfors/timebin"
            color="teal.500"
          >
            <HStack>
              <Icon as={FaGithub} boxSize={5} />
              <Text fontSize="lg" as="b">
                Github
              </Text>
            </HStack>
          </Link>
        </HStack>
        <Card>
          <CardBody>{body}</CardBody>
        </Card>
        <Stack>
          <Text color="gray.600">
            How does it work? Timebin uses the{" "}
            <Link href="https://drand.love" isExternal color="teal.500">
              drand
            </Link>{" "}
            distributed randomness network to derive an encryption key for the
            time you specify. Once encrypted, the data can only be decrypted
            after that time has passed as guaranteed by the network.
          </Text>
          <Text color="gray.600">
            Timebin is 100% client-side, encryption happens in your browser and
            your data is never sent to any server. Your generated URL contains
            the full encrypted ciphertext. Timebin is of course open-source on{" "}
            <Link
              href="https://github.com/fabianlindfors/timebin"
              color="teal.500"
            >
              <Icon as={FaGithub} /> Github
            </Link>{" "}
            and can be self-hosted!
          </Text>

          <Divider mt={4} mb={4} />

          <Text color="gray.600">
            Created by{" "}
            <Link href="https://fabianlindfors.se" color="teal.500">
              Fabian Linfors
            </Link>{" "}
            (
            <Link href="mailto:fabian@flapplabs.se" color="teal.500">
              don't be a stranger 👋
            </Link>
            ) – if you like this, check out{" "}
            <Link href="https://reshapedb.com" color="teal.500">
              ReshapeDB
            </Link>
            !
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
