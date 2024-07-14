import { PublicKey } from "@solana/web3.js";

/**
 * @description The program public key addresses deployed program on the solana
 */
const PROGRAM_ID = new PublicKey(
  "DKuXP1NU5U4Mc2wgCurPEtMHmWxQnGCCx9epeCd41JWi",
);

const METADATA_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);
const PROGRAM_NAME = "RabbidHall";

export { PROGRAM_ID, METADATA_ID, PROGRAM_NAME };
