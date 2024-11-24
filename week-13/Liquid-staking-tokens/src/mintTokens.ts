import {
  createBurnInstruction,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import {
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { connection, payer } from "./config/solana";
import { TOKEN_MINT_ADDRESS, PUBLIC_KEY, ATA_ADDRESS } from "./address";
import { LstToSol, SolToLst } from "./util";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


const calculateAmountToMint = (amountInLamports: number) => {
  console.log("Calculating amount to mint", amountInLamports);
  const amountToMint = SolToLst(amountInLamports);
  console.log("Amount to mint", amountToMint);
  return amountToMint;
};

const calculateNativeAmountToSend = (amountInLamports: number) => {
  console.log("Calculating native amount to send", amountInLamports);
  const amountToSend = LstToSol(amountInLamports);
  console.log("Amount to send", amountToSend);
  return amountToSend;
};

export const mintTokens = async (
  toAddress: PublicKey,
  amountInLamports: number
) => {
  try {
    console.log("Minting tokens");
    const receiverAtaAddress = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      TOKEN_MINT_ADDRESS,
      toAddress,
      true,
      "confirmed",
      undefined,
      TOKEN_2022_PROGRAM_ID
    );
    let amountToMint = calculateAmountToMint(amountInLamports);
    console.log("Amount to mint", amountToMint);
    await mintTo(
      connection,
      payer,
      TOKEN_MINT_ADDRESS,
      receiverAtaAddress.address,
      payer,
      amountToMint,
      [],
      undefined,
      TOKEN_2022_PROGRAM_ID
    );
    console.log("Tokens minted");
  } catch (error) {
    console.log("Error minting tokens", error);
    throw new Error("Error minting tokens");
  }
};

export const burnTokensAndSendNativeTokens = async (
  userAddress: PublicKey,
  amount: number
) => {
  try {
    // Combine burn and transfer in a single atomic transaction
    console.log("Burning tokens and sending native tokens");
    await sleep(10000);
    let amountOfNativeTokensToSend = calculateNativeAmountToSend(amount);
    console.log("Amount of native tokens to send", amountOfNativeTokensToSend);
    const transaction = new Transaction()
      .add(
        createBurnInstruction(
          ATA_ADDRESS,
          TOKEN_MINT_ADDRESS,
          PUBLIC_KEY,
          amount,
          [],
          TOKEN_2022_PROGRAM_ID
        )
      )
      .add(
        SystemProgram.transfer({
          fromPubkey: payer.publicKey,
          toPubkey: userAddress,
          lamports: amountOfNativeTokensToSend,
        })
      );
    await sendAndConfirmTransaction(connection, transaction, [payer], {
      skipPreflight: true,
      commitment: "confirmed",
    });
    console.log("Tokens burned and native tokens sent");
  } catch (error) {
    console.log("Error burning tokens and sending native tokens", error);
    throw new Error("Error burning tokens and sending native tokens");
  }
};
