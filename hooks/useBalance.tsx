import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";

const useBalance = () => {
  // Get info about solana wallet adapter
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  // Get balance of the connected account
  const fetchBalance = async () => {
    if (publicKey && connection) {
      const balance = await connection.getBalance(publicKey);
      return (balance / LAMPORTS_PER_SOL).toFixed(3);
    } else {
      throw new Error("Wallet is not connected!");
    }
  };

  const { data, error, status } = useQuery({
    queryKey: ["wallet_balance_" + publicKey?.toBase58()],
    queryFn: fetchBalance,
  });

  return { balance: data, errorMessage: error?.message, status };
};

export default useBalance;
