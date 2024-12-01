import axios from "axios";
import {
  Transaction,
  Connection,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Form } from "react-router-dom";

const connection = new Connection("https://api.devnet.solana.com");
const fromPubkey = new PublicKey(
  "5ULzT7wyU4TqB62mVgp7ccUarnB1n9bS9cHjZJ4UT21n"
);
function TransactionComponent() {
  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey("BNkMidcxr1wCjqfJZnCnRVLuhFws8f2EnKQokPD7fLhR"),
      lamports: 0.01 * LAMPORTS_PER_SOL,
    });
    const tx = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = fromPubkey;

    // convert the transaction to a bunch of bytes
    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    console.log(serializedTx);

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializedTx,
      retry: false,
    });
  }

  return (
    <div className="form-container">
      <h2>Transaction</h2>
      <Form method="post" action="/signin">
        <input type="text" placeholder="Amount"></input>
        <input type="text" placeholder="Address"></input>
        <button onClick={sendSol}>Submit</button>
      </Form>
    </div>
  );
}

export default TransactionComponent;
