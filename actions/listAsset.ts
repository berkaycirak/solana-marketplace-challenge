import { program } from "@/anchor/setup";
import { program_pk } from "@/constants";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { clusterApiUrl, Connection, PublicKey, Signer } from "@solana/web3.js";

export const listAsset = async (signer: string) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const CPT_address = "BLZZjhv3vPJCktBtZ6yxHXm5zvXBCQj489aPdgAJz4xj";
  const [marketplacePda] = PublicKey.findProgramAddressSync(
    [Buffer.from("marketplace"), utf8.encode("Berkay")],
    program_pk,
  );
  const [listingPda] = PublicKey.findProgramAddressSync(
    [Buffer.from(marketplacePda.toBase58()), Buffer.from(CPT_address)],
    program_pk,
  );
  console.log(listingPda);

  const marketplaceAccount =
    await program.account.marketplace.fetch(marketplacePda);
  // const listingAccount = await program.account.listing.fetch()

  const listTx = program.methods
    .list(0.005)
    .accounts({
      maker: signer,
      marketplace: marketplacePda,
      makerMint: CPT_address,
    })
    .transaction();
};
