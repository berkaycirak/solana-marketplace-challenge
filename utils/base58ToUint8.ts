import { createHash } from "crypto";

export const base58ToUint8 = (address: string) => {
  let hexString = createHash("sha256").update(address, "utf-8").digest("hex");
  let seed = Uint8Array.from(Buffer.from(hexString, "hex"));
  return seed;
};
