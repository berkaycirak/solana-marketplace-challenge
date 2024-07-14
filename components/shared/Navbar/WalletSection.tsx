"use client";
import useBalance from "@/hooks/useBalance";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import WalletButton from "../WalletButton";
import { redditMono } from "@/app/fonts";
import SolanaIcon from "@/assets/icon/SolanaIcon";

const WalletSection = () => {
  const { balance, errorMessage, status } = useBalance();
  const { connected } = useWallet();
  return (
    <div className="flex items-center space-x-4">
      {connected && (
        <p
          className={cn(
            "flex min-w-[100px] cursor-pointer items-center gap-2 rounded border px-4 py-3 text-white",
            redditMono.className,
          )}
        >
          {balance} <SolanaIcon />
        </p>
      )}

      <WalletButton />
    </div>
  );
};

export default WalletSection;
