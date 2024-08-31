import React, { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "react-toastify";
import { ShowSolBalance } from "./ShowSolBalance";
import { SignMessage } from "./SignMessage";
import { SendTokens } from "./SendTokens";

export function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState(1);
  const isConnected = wallet.connected;
  const [balance, setBalance] = useState(0);
  const handleChange = (e) => {
    setAmount(Number(e.target.value));
  };

  async function requestAirdrop() {
    if (!wallet.publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      await connection.requestAirdrop(
        wallet.publicKey,
        amount * LAMPORTS_PER_SOL
      );
      toast.success(
        `Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`
      );
    } catch (error) {
      console.error("Error requesting airdrop:", error);
      toast.error("Failed to request airdrop. Try again later.");
    }
  }

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
    console.log("file: RequestAirdrop.jsx:61 - useEffect:");
    getBalance();
  }, [wallet.publicKey, balance]);

  return (
    <div className="form">
      <ShowSolBalance balance={balance} />
      <div>
        <input
          value={amount}
          onChange={handleChange}
          required
          type="number"
          max={5}
          min={1}
          placeholder="Amount"
        />
        <button onClick={requestAirdrop} disabled={!isConnected}>
          Request Airdrop
        </button>
      </div>
      <SignMessage />
      <SendTokens balance={balance} setBalance={setBalance} />
    </div>
  );
}
