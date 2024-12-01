import {
  Transaction,
  Connection,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Form } from "react-router-dom";
import { useMyContext } from "./PagesLayout";
import customFetch from "../utils/customFetch";
import { useState } from "react";
import bs58 from "bs58";

const connection = new Connection("https://api.devnet.solana.com");

function TransactionComponent() {
  const { wallet } = useMyContext();
  const [toPubkey, setToPubkey] = useState("");

  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey: new PublicKey(wallet?.publicKey),
      toPubkey: new PublicKey(toPubkey),
      lamports: 0.01 * LAMPORTS_PER_SOL,
    });
    const tx = new Transaction().add(ix);
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = new PublicKey(wallet?.publicKey);

    // convert the transaction to a bunch of bytes
    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    await customFetch.post("/txn/sign", {
      message: serializedTx,
      retry: false,
    });
  }

  return (
    <div className="form-container">
      <h2>Transaction</h2>
      <Form>
        {wallet && <p>My Pubkey: {wallet?.publicKey}</p>}
        <input type="text" value={1} placeholder="Amount"></input>
        <input
          type="text"
          value={toPubkey}
          onChange={(e) => setToPubkey(e.target.value)}
          placeholder="Recipient Address"
        />
        <button onClick={sendSol}>Submit</button>
      </Form>
    </div>
  );
}

export default TransactionComponent;
