import * as tlock from "tlock-js";

const client = tlock.mainnetClient();
client.httpOptions = {};

export async function encrypt(
  plaintext: string,
  timestampMs: number
): Promise<string> {
  const round = tlock.roundAt(timestampMs, tlock.defaultChainInfo);

  return await tlock.timelockEncrypt(
    round,
    tlock.Buffer.from(plaintext),
    client
  );
}

export async function decrypt(ciphertext: string): Promise<string> {
  try {
    const result = await tlock.timelockDecrypt(ciphertext, client);
    return result.toString();
  } catch (e) {
    // Convert not decryptable yet error into a more informative error with a date and time
    const earlyRegex = /decryptable at round ([0-9]+)/;
    const matches = e.message.match(earlyRegex);
    if (matches) {
      const round = parseInt(matches[1]);
      const timestampMs = tlock.roundTime(tlock.defaultChainInfo, round);
      const date = new Date(timestampMs);

      throw new Error(
        `This message is not decryptable until ${date.toLocaleString()} UTC`
      );
    }

    throw e;
  }
}
