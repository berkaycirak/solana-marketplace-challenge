interface TokenAsset {
  interface: string;
  id: string;
  content: Content;
  authorities: string[];
  compression: Compression;
  grouping: any[];
  royalty: Royalty;
  creators: string[];
  ownership: Ownership;
  supply: any;
  mutable: boolean;
  burnt: boolean;
  token_info: TokenInfo;
}
interface Metadata {
  attributes: {
    value: string;
    trait_type: string;
  }[];

  description: string;
  name: string;
  symbol: string;
  token_standard: string;
}

interface Content {
  $schema: string;
  json_uri: string;
  files: any[];
  metadata: Metadata;
  links: Record<string, any>;
}

interface Compression {
  eligible: boolean;
  compressed: boolean;
  data_hash: string;
  creator_hash: string;
  asset_hash: string;
  tree: string;
  seq: number;
  leaf_id: number;
}

interface Royalty {
  royalty_model: string;
  target: any;
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
}

interface Ownership {
  frozen: boolean;
  delegated: boolean;
  delegate: any;
  ownership_model: string;
  owner: string;
}

interface TokenInfo {
  balance: number;
  supply: number;
  decimals: number;
  token_program: string;
  associated_token_address: string;
  mint_authority: string;
}

export type HeliusSearchAssetsResponse = TokenAsset[];
