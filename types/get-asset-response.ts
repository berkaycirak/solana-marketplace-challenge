export interface GetAssetResponse {
  interface: string;
  id: string;
  content: {
    $schema: string;
    json_uri: string;
    files: any[];
    metadata: {
      attributes: any[];
      description: string;
      name: string;
      symbol: string;
    };
    links: {
      image: string;
    };
  };
  authorities: {
    address: string;
    scopes: string[];
  };
  compression: {
    eligible: boolean;
    compressed: boolean;
    data_hash: string;
    creator_hash: string;
    asset_hash: string;
    tree: string;
  };
  grouping: {
    group_key: string;
    group_value: string;
  };
  royalty: {
    royalty_model: string;
    target: string;
    percent: number;
    primary_sale_happened: boolean;
    locked: boolean;
  };
  creators: {
    address: string;
    verified: boolean;
  };
  ownership: {
    frozen: boolean;
    delegated: boolean;
    delegate: string;
    ownership_model: string;
    owner: string;
    supply: string;
    mutable: boolean;
    burnt: boolean;
  };
  mint_extensions: {
    confidential_transfer_mint: {
      authority: string;
      auto_approve_new_accounts: boolean;
      auditor_elgamal_pubkey: string;
    };
    confidential_transfer_fee_config: {
      authority: string;
      withdraw_withheld_authority_elgamal_pubkey: string;
      harvest_to_mint_enabled: boolean;
      withheld_amount: string;
    };
    transfer_fee_config: {
      transfer_fee_config_authority: string;
      withdraw_withheld_authority: string;
      older_transfer_fee: {
        epoch: string;
        maximum_fee: string;
        transfer_fee_basis_points: string;
      };
      newer_transfer_fee: {
        epoch: string;
      };
    };
    metadata_pointer: {
      authority: string;
      metadata_address: string;
    };
    mint_close_authority: {
      close_authority: string;
    };
    permanent_delegate: {
      delegate: string;
    };
    transfer_hook: {
      authority: string;
      program_id: string;
    };
    interest_bearing_config: {
      rate_authority: string;
    };
    default_account_state: string;
    confidential_transfer_account: {
      approved: boolean;
      elgamal_pubkey: string;
      pending_balance_lo: string;
      pending_balance_hi: string;
      available_balance: string;
      decryptable_available_balance: string;
      allow_confidential_credits: boolean;
      allow_non_confidential_credits: boolean;
    };
    metadata: {
      update_authority: string;
      mint: string;
      name: string;
      symbol: string;
      uri: string;
      additional_metadata: Array<{
        key: string;
        value: string;
      }>;
    };
  };
  supply: {
    master_edition_mint: string;
  };
  token_info: {
    symbol: string;
    token_program: string;
    price_info: {
      price_per_token: number;
      currency: string;
    };
    mint_authority: string;
    freeze_authority: string;
  };
  inscription: {
    contentType: string;
    encoding: string;
    validationHash: string;
    inscriptionDataAccount: string;
    authority: string;
  };
}
