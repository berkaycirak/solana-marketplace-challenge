import { PublicKey } from "@solana/web3.js";

/**
 * @description The program public key addresses deployed program on the solana
 */
const PROGRAM_ID = new PublicKey(
  "ExVEuRgiSqhPogdkQiWT4vH4A6EjnWkyoUNKCrJeAS7r",
);

const METADATA_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);
const PROGRAM_NAME = "berkai";

const walletArray = [
  154, 114, 61, 30, 44, 129, 70, 138, 67, 221, 84, 15, 36, 94, 188, 76, 127, 97,
  86, 68, 110, 203, 29, 104, 39, 147, 97, 69, 146, 174, 166, 17, 153, 93, 227,
  192, 155, 68, 9, 193, 174, 59, 65, 214, 25, 202, 7, 246, 88, 180, 69, 117, 41,
  101, 224, 48, 31, 201, 183, 35, 10, 83, 106, 199,
];

export { PROGRAM_ID, METADATA_ID, PROGRAM_NAME, walletArray };
