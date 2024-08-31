import React, { useState } from "react";
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
  const [balance, setBalance] = useState(null);

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

  return (
    <div className="form">
      <ShowSolBalance balance={balance} setBalance={setBalance} />
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
