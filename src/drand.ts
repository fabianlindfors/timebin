import * as tlock from "tlock-js";

const client = tlock.mainnetClient();
client.httpOptions = {};

export async function encrypt(plaintext: string, time: Date): Promise<string> {
  const round = tlock.roundAt(time.getTime() * 1000, tlock.defaultChainInfo);

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
    console.error("Test", e);
    throw e;
  }
}
