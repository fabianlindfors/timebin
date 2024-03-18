import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

function Root() {
  return (
    <>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      <script defer src="https://static.cloudflareinsights.com/beacon.min.js" />
    </>
  );
}

const root = document.getElementById("root");
console.log(root);

ReactDOM.render(<Root />, root);
