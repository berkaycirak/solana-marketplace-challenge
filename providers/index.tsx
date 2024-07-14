import React from "react";
import AppWalletProvider from "./AppWalletProvider";
import QueryProvider from "./QueryProvider";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <AppWalletProvider>
        {children}
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "InfoBackground",
              border: "2px dashed black",
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
      </AppWalletProvider>
    </QueryProvider>
  );
};

export default Providers;
