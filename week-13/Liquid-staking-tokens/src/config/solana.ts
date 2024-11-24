import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
export const SOLANA_RPC_URL = "https://api.devnet.solana.com";
export const connection = new Connection(SOLANA_RPC_URL);
export const payer = Keypair.fromSecretKey(
    bs58.decode(process.env.SOLANA_PRIVATE_KEY!)
  );