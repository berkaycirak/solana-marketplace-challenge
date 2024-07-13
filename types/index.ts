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
