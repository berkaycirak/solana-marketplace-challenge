import React from "react";
import AppWalletProvider from "./AppWalletProvider";
import QueryProvider from "./QueryProvider";
import { Toaster } from "sonner";
import { AnchorProvider } from "@coral-xyz/anchor";
interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <AppWalletProvider>
        <Toaster />
        {children}
      </AppWalletProvider>
    </QueryProvider>
  );
};

export default Providers;
