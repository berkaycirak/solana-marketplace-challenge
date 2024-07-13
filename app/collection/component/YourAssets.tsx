"use client";
import React, { useEffect, useState } from "react";
import { PublicKey } from "@metaplex-foundation/umi";

import { Mint } from "@metaplex-foundation/mpl-toolbox";
import {
  Metadata,
  MasterEdition,
  Edition,
} from "@metaplex-foundation/mpl-token-metadata";

import Image from "next/image";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import useAddressAssets from "@/hooks/useAddressAssets";

export type DigitalAsset = {
  publicKey: PublicKey;
  mint: Mint;
  metadata: Metadata;
  edition?:
    | ({ isOriginal: true } & MasterEdition)
    | ({ isOriginal: false } & Edition);
};

const YourAssets = () => {
  const { connection } = useConnection();
  const { publicKey: connectedWalletPublicKey, sendTransaction } = useWallet();

  const { assetInfos, status } = useAddressAssets();

  return (
    <div className="p-12">
      {assetInfos?.map(
        ({
          attributes,
          description,
          image,
          name,
          owner,
          publicKey,
          symbol,
        }) => {
          return (
            <div key={publicKey}>
              <div>
                <h5 className="font-bold">{name}</h5>
                {attributes.map((attribute) => (
                  <ul key={attribute.value} className="flex items-center gap-2">
                    <li className="font-bold">{attribute.trait_type}</li>
                    <li>{attribute.value}</li>
                  </ul>
                ))}
              </div>

              <Image
                src={image}
                alt={name}
                height={300}
                width={300}
                className="rounded-lg"
              />
              <Button>List</Button>
            </div>
          );
        },
      )}
    </div>
  );
};

export default YourAssets;
