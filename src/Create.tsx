import * as React from "react";

import {
  Textarea,
  Code,
  Input,
  FormControl,
  FormLabel,
  Divider,
  Stack,
  useToast,
  HStack,
  Text,
  Button,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

import { encrypt } from "./drand";

export default function Create() {
  const toast = useToast();

  const [plaintext, setPlaintext] = React.useState("");
  const debouncedPlaintext = useDebouncedValue(plaintext, 500);

  const [datetime, setDatetime] = React.useState<number>(Date.now());
  const [ciphertext, setCiphertext] = React.useState("");

  const currentUrl = new URL(window.location.href);

  const base64ciphertext = btoa(ciphertext);
  const url =
    ciphertext === "" ? "" : `${currentUrl.origin}/view#${base64ciphertext}`;

  const handlePlaintextChange = (e) => {
    setPlaintext(e.target.value);
  };

  const handleDatetimeChange = (e) => {
    const raw = e.target.value;
    try {
      setDatetime(new Date(raw + ".000Z").getTime());
    } catch (e) {
      console.error("Invalid date", e);
    }
  };

  React.useEffect(() => {
    if (plaintext === "") {
      return;
    }

    (async () => {
      const ciphertext = await encrypt(plaintext, datetime);
      setCiphertext(ciphertext);
    })();
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
          <FormLabel>Time after which contents should be decryptable</FormLabel>
          <InputGroup>
            <Input
              placeholder="Select date and time"
              size="md"
              type="datetime-local"
              step={1}
              defaultValue={new Date(datetime).toISOString().slice(0, -5)}
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
  );
}

function useDebouncedValue(inputValue, delay) {
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
}
