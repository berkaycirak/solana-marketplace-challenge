import React from "react";
import useProgram from "./useProgram";
import { getListingAccounts } from "@/anchor-marketplace/program-accounts";
import { getAsset } from "@/actions/getAssets";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";

const useListedAssets = () => {
  const program = useProgram();
  const { publicKey } = useWallet();
  // Fetching listed nfts on the marketplace thanks to accounts on the program
  const fetchListings = async () => {
    if (program && publicKey) {
      try {
        const listings = await getListingAccounts(program);

        const listingPromises = listings.map(async (listing) => {
          const mintAddress = listing.account.mint.toBase58();
          const owner = listing.account.maker.toBase58();
          const data = await getAsset(mintAddress);

          return {
            price: Number(listing.account.price) / LAMPORTS_PER_SOL,
            mintAddress,
            owner,
            name: data.content.metadata.name,
            description: data.content.metadata.description,
            image: data.content.links.image,
          };
        });
        const listedAssets = await Promise.all(listingPromises);

        const yourListings = listedAssets.filter(
          (asset) =>
            asset.owner.toLowerCase() === publicKey?.toBase58().toLowerCase(),
        );

        const otherListings = listedAssets.filter(
          (asset) =>
            asset.owner.toLowerCase() != publicKey?.toBase58().toLowerCase(),
        );
        console.log(yourListings);

        return { yourListings, otherListings };
      } catch (error) {
        console.log(error);
        toast.error("An error occured while fetching listed nfts.");
      }
    }
  };

  const { data, status, refetch } = useQuery({
    queryFn: fetchListings,
    queryKey: ["listed_nfts"],
    refetchInterval: 10 * 60 * 1000, //10sec
    enabled: !!program,
  });
  return {
    connectedAccountListings: data?.yourListings,
    othersListings: data?.otherListings,
    status,
    refetch,
  };
};

export default useListedAssets;
