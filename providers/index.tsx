import React from "react";
import AppWalletProvider from "./AppWalletProvider";
import QueryProvider from "./QueryProvider";
import { Toaster } from "sonner";
import { AnchorProvider } from "@coral-xyz/anchor";
import { ProgramProvider } from "./ProgramProvider";
interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <AppWalletProvider>
        <ProgramProvider>{children}</ProgramProvider>
        <Toaster />
      </AppWalletProvider>
    </QueryProvider>
  );
};

export default Providers;
