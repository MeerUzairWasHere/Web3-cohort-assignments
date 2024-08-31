import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function ShowSolBalance({ balance, setBalance }) {
  const { connection } = useConnection();
  const wallet = useWallet();

  // Step 2: Create a function to fetch the balance
  async function getBalance() {
    if (wallet.publicKey) {
      try {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }
  }

  // Step 3: Use useEffect to call getBalance when the component mounts or wallet changes
  useEffect(() => {
    getBalance();
  }, [balance, wallet.publicKey]);

  return <h4>{balance && <p>SOL Balance: {balance}</p>}</h4>;
}
