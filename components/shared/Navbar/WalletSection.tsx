"use client";
import useBalance from "@/hooks/useBalance";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import WalletButton from "../WalletButton";
import { redditMono } from "@/app/fonts";

const WalletSection = () => {
  const { balance, errorMessage, status } = useBalance();
  const { connected } = useWallet();
  return (
    <div className="flex items-center space-x-4">
      {connected && (
        <span
          className={cn(
            "min-w-[100px] cursor-pointer rounded border px-4 py-3 text-white",
            redditMono.className,
          )}
        >
          {balance} SOL
        </span>
      )}

      <WalletButton />
    </div>
  );
};

export default WalletSection;
