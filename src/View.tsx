import * as React from "react";
import { decrypt } from "./drand";
import { Alert, AlertIcon, Code, Skeleton, Text } from "@chakra-ui/react";

export default function View() {
  const [plaintext, setPlaintext] = React.useState<string | undefined>(
    undefined
  );
  const [error, setError] = React.useState<string | undefined>(undefined);

  const currentUrl = new URL(window.location.href);

  let ciphertext: string | undefined = undefined;
  if (currentUrl.hash !== "") {
    ciphertext = atob(currentUrl.hash.slice(1));
  }

  React.useEffect(() => {
    (async () => {
      if (ciphertext === undefined) {
        return;
      }

      try {
        const decrypted = await decrypt(ciphertext);
        setPlaintext(decrypted);
      } catch (e) {
        setPlaintext(undefined);
        setError(e.message);
      }
    })();
  }, [ciphertext]);

  if (error !== undefined) {
    return (
      <Alert status="warning">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Code padding="15px" width="100%">
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {plaintext === undefined ? <Skeleton>Loading...</Skeleton> : plaintext}
      </pre>
    </Code>
  );
}
