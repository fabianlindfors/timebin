import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  ChakraProvider,
  Box,
  Container,
  Textarea,
  Code,
  Input,
  FormControl,
  FormLabel,
  Divider,
  Stack,
  useToast,
  Card,
  CardBody,
  HStack,
  Text,
  Link,
  Icon,
  VStack,
  Spacer,
  FormHelperText,
  Button,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

import { FaGithub } from "react-icons/fa";
import { TbClockBolt } from "react-icons/tb";

import * as tlock from "tlock-js";

const useDebouncedValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(inputValue);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const client = tlock.mainnetClient();
client.httpOptions = {};

function App() {
  const toast = useToast();

  const [plaintext, setPlaintext] = React.useState("");
  const [datetime, setDatetime] = React.useState(new Date());
  const [ciphertext, setCiphertext] = React.useState("");
  const debouncedPlaintext = useDebouncedValue(plaintext, 500);

  const currentUrl = new URL(window.location.href);

  const round = tlock.roundAt(
    datetime.getTime() * 1000,
    tlock.defaultChainInfo
  );

  const base64ciphertext = btoa(ciphertext);
  const url =
    ciphertext === "" ? "" : `${currentUrl.origin}/view#${base64ciphertext}`;

  const handlePlaintextChange = (e) => {
    setPlaintext(e.target.value);
  };

  const handleDatetimeChange = (e) => {
    const raw = e.target.value;
    try {
      setDatetime(new Date(raw));
    } catch (e) {
      console.error("Invalid date", e);
    }
  };

  React.useEffect(() => {
    if (plaintext === "") {
      return;
    }

    const encrypt = async () => {
      const ciphertext = await tlock.timelockEncrypt(
        round,
        tlock.Buffer.from(plaintext),
        client
      );

      setCiphertext(ciphertext);
    };

    encrypt();
  }, [debouncedPlaintext, datetime]);

  const copyUrl = () => {
    if (url === "") {
      return;
    }

    navigator.clipboard.writeText(url);

    toast({
      title: "URL copied!",
      status: "success",
      duration: 1000,
    });
  };

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
          <CardBody>
            <Stack spacing={8}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Contents</FormLabel>
                  <Textarea
                    placeholder="Enter the contents you want to encrypt..."
                    value={plaintext}
                    onChange={handlePlaintextChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    Time after which contents should be decryptable
                  </FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Select date and time"
                      size="md"
                      type="datetime-local"
                      step={1}
                      defaultValue={datetime.toISOString().slice(0, -5)}
                      onChange={handleDatetimeChange}
                      onSelect={handleDatetimeChange}
                    />
                    <InputRightAddon>UTC</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </Stack>

              <Divider />

              <FormControl>
                <HStack mb={2} spacing={3}>
                  <Text fontWeight="medium">URL</Text>
                  {url !== "" ? (
                    <Button size="xs" onClick={copyUrl}>
                      Copy URL
                    </Button>
                  ) : undefined}
                </HStack>
                <Code
                  padding="15px"
                  width="100%"
                  cursor={url === "" ? undefined : "pointer"}
                  onClick={copyUrl}
                >
                  <pre style={{ whiteSpace: "pre-wrap" }}>
                    {url !== ""
                      ? url
                      : "Add some content above to get an encrypted URL"}
                  </pre>
                </Code>
              </FormControl>
            </Stack>
          </CardBody>
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
        </Stack>
      </Stack>
    </Container>
  );
}

function Root() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

const root = document.getElementById("root");
console.log(root);

ReactDOM.render(<Root />, root);
