import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { toast } from "react-toastify";

export function SendTokens({ balance, setBalance }) {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  async function sendTokens() {
    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(toAddress),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    try {
      await wallet.sendTransaction(transaction, connection);
      toast.success(`Sent ${amount} SOL to ${toAddress}`);
      getBalance();
    } catch (error) {
      console.log("file: SendTokens.jsx:33 - error:", error);
      toast.error("Transaction failed: " + error.message);
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

  return (
    <div>
      <input
        type="text"
        placeholder="To"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTokens}>Send</button>
    </div>
  );
}
