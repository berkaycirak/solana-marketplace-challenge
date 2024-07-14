import { Program } from "@coral-xyz/anchor";
import { marketplacePda } from "./pda";
import { AnchorMarketplace } from "@/idl/anchor_marketplace";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { fetchAssetsOfAddress } from "@/actions/fetchAssetsOfAddress";
import { MarketplaceProgram } from "@/types";

// Marketplace Account
const getMarketplaceAccount = async (program: MarketplaceProgram) => {
  const marketplaceAccount =
    await program.account.marketplace.fetch(marketplacePda);
  console.log("Marketplace Account:", marketplaceAccount);
  return marketplaceAccount;
};

// Listing Account

const getListingAccounts = async (program: MarketplaceProgram) => {
  const listingAccounts = await program.account.listing.all();

  console.log(Number(listingAccounts[0].account.price) / LAMPORTS_PER_SOL);
  console.log(listingAccounts[0].account.mint.toBase58());
  const x = await fetchAssetsOfAddress({
    address: listingAccounts[0].account.mint.toBase58(),
  });
  console.log(x);

  return listingAccounts;
};

export { getMarketplaceAccount, getListingAccounts };
