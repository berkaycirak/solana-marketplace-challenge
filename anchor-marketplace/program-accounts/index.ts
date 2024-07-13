import { marketplacePda } from "./pda";
import { program } from "../setup";

// Marketplace Account
const getMarketplaceAccount = async () => {
  const marketplaceAccount =
    await program.account.marketplace.fetch(marketplacePda);
  console.log("Marketplace Account:", marketplaceAccount);
  return marketplaceAccount;
};

// Listing Account

const getListingAccount = async () => {
  const listingAccount = await program.account.listing.all();
  console.log("Listing Account:", listingAccount);
  return listingAccount;
};

export { getMarketplaceAccount, getListingAccount };
