import { AnchorMarketplace } from "@/idl/anchor_marketplace";
import { Program } from "@coral-xyz/anchor";

export interface NFTMetadata {
  attributes: {
    value: string;
    trait_type: string;
  }[];
  description: string;
  image: string;
  name: string;
  symbol: string;
}

export interface MarketplaceProgram extends Program<AnchorMarketplace> {}
