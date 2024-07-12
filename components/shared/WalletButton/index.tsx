"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useEffect, useState } from "react";

const WalletButton = () => {
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <div className="inline-block min-w-[150px] rounded hover:border-slate-900">
      {isMount ? (
        <WalletMultiButton />
      ) : (
        <Skeleton baseColor="grey" className="h-8" />
      )}
    </div>
  );
};

export default WalletButton;
