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
  Hide,
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
      <Stack spacing={7}>
        <HStack>
          <Link href="/" _hover={{ textDecoration: "none" }}>
            <HStack spacing={3}>
              <Icon as={TbClockBolt} boxSize={12} />
              <VStack spacing={1} align="flex-start">
                <Text
                  fontSize={{ base: "2xl", sm: "3xl" }}
                  as="b"
                  lineHeight={1}
                >
                  Timebin
                </Text>
                <Text
                  fontSize={{ base: "sm", sm: "sm" }}
                  fontWeight="medium"
                  color="gray.600"
                >
                  Securely share encrypted content that can only be decrypted
                  after a certain time
                </Text>
                <Hide above="sm">
                  <Link
                    href="https://github.com/fabianlindfors/timebin"
                    color="teal.500"
                  >
                    <HStack>
                      <Icon as={FaGithub} boxSize={4} />
                      <Text fontSize="sm" as="b">
                        Github
                      </Text>
                    </HStack>
                  </Link>
                </Hide>
              </VStack>
            </HStack>
          </Link>
          <Spacer />
          <Show above="sm">
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
          </Show>
        </HStack>

        <Card>
          <CardBody>{body}</CardBody>
        </Card>

        <Stack>
          <Text color="gray.600">
            How does it work? Timebin uses the{" "}
            <Link href="https://drand.love" color="teal.500">
              drand
            </Link>{" "}
            distributed randomness network and{" "}
            <Link
              href="https://drand.love/docs/timelock-encryption/"
              color="teal.500"
            >
              time-lock encryption
            </Link>{" "}
            to ensure your encrypted data can only be decrypted after the time
            you choose.
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
              Fabian Lindfors
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
