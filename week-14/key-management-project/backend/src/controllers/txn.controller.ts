import bs58 from "bs58";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { prismaClient } from "../db";

const connection = new Connection("https://api.devnet.solana.com");

// export const sign = async (req: Request, res: Response) => {
//   const serializedTransaction = req.body.message;
//   console.log("before serialise");
//   console.log(serializedTransaction);

//   const tx: any = Transaction.from(serializedTransaction);
//   console.log("after serialise");
//   console.log(bs58);

//   const wallet = await prismaClient.wallet.findFirst({
//     where: { userId: Number(req?.user?.userId) },
//   });

//   const keyPair = Keypair.fromSecretKey(bs58.decode(wallet?.privateKey || ""));

//   const { blockhash } = await connection.getLatestBlockhash();

//   tx.blockhash = blockhash;
//   tx.feePayer = wallet?.publicKey;

//   tx.sign(keyPair);

//   const signature = await connection.sendTransaction(tx, [keyPair]);
//   console.log(signature);

//   res.status(StatusCodes.OK).json({ msg: "test" });
// };

export const sign = async (req: Request, res: Response) => {
  const serializedTransaction = req.body.message;

  if (!serializedTransaction) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing serialized transaction" });
  }

  console.log("Before deserialization:", serializedTransaction);

  // Decode the serialized transaction (assuming base64 encoded)
  const tx = Transaction.from(Buffer.from(serializedTransaction, "base64"));
  console.log("After deserialization:", tx);

  // Fetch the wallet associated with the user
  const wallet = await prismaClient.wallet.findFirst({
    where: { userId: Number(req?.user?.userId) },
  });

  if (!wallet) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Wallet not found for user" });
  }
  console.log(wallet?.privateKey);
  const privateKeyString = wallet.privateKey; // Assuming this is a comma-separated string
  const privateKeyArray = privateKeyString
    .split(",") // Split the string into an array
    .map((num) => parseInt(num.trim(), 10)); // Convert each element to a number
  // Create Keypair from the private key
  const keyPair = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));

  // Update transaction with recent blockhash and fee payer
  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = new PublicKey(wallet.publicKey);

  // Sign the transaction
  tx.sign(keyPair);

  // Send the signed transaction
  const signature = await connection.sendTransaction(tx, [keyPair]);
  console.log("Transaction signature:", signature);

  res.status(StatusCodes.OK).json({ signature });
};

export const status = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "test" });
};
