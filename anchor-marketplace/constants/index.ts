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

const private_key =
  "466cVVMfthgc12GazPQjoPeq4wW4ePsDYdT8GwUhpHW35vScEGYu3YSA23zyx92H4duCEtiXzukNHQvWs7dJ9KXc";

const public_key = "6LHit9vc5XxG4a8iFzKsAHBNf1HTEM1sRLPht6YbdoqP";

const signerWallet = [
  247, 248, 34, 22, 46, 207, 17, 172, 89, 161, 131, 112, 225, 63, 49, 253, 15,
  144, 33, 53, 241, 173, 11, 97, 105, 185, 136, 109, 241, 150, 98, 103, 79, 59,
  96, 179, 248, 55, 190, 208, 70, 248, 171, 42, 124, 35, 24, 163, 133, 146, 219,
  132, 229, 101, 19, 192, 130, 106, 139, 74, 177, 49, 246, 78,
];

export {
  PROGRAM_ID,
  METADATA_ID,
  PROGRAM_NAME,
  private_key,
  public_key,
  signerWallet,
};
