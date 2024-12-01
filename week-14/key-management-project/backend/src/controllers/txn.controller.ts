import bs58 from "bs58";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Connection, Keypair, Transaction } from "@solana/web3.js";
import { prismaClient } from "../db";

const connection = new Connection("https://api.devnet.solana.com");

export const sign = async (req: Request, res: Response) => {
  const serializedTransaction = req.body.message;

  console.log("before serialise");
  console.log(serializedTransaction);

  const tx: any = Transaction.from(Buffer.from(serializedTransaction));
  console.log("after serialise");
  console.log(bs58);

  const wallet = await prismaClient.wallet.findFirst({
    where: { userId: Number(req?.user?.userId) },
  });

  const keyPair = Keypair.fromSecretKey(bs58.decode(wallet?.privateKey || ""));

  const { blockhash } = await connection.getLatestBlockhash();
  
  tx.blockhash = blockhash;
  tx.feePayer = wallet?.publicKey;

  tx.sign(keyPair);

  const signature = await connection.sendTransaction(tx, [keyPair]);
  console.log(signature);

  res.status(StatusCodes.OK).json({ msg: "test" });
};

export const status = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "test" });
};
