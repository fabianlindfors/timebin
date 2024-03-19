import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

// @ts-ignore This is dynamically inserted by esbuild to not add tracking to self-hosted instances
const cloudflareAnalyticsId = ANALYTICS_ID;
const cfBeacon = cloudflareAnalyticsId
  ? JSON.stringify({
      token: cloudflareAnalyticsId,
    })
  : undefined;
console.log(cfBeacon);

function Root() {
  return (
    <>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      {cfBeacon ? (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={cfBeacon}
        />
      ) : undefined}
    </>
  );
}

const root = document.getElementById("root");

ReactDOM.render(<Root />, root);
