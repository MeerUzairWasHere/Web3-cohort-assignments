// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { Transaction } from "@solana/web3.js";
import axios from "axios";

export const SOL_TOKEN_PROGRAM_ID =
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
export const SOL_MINT = "So11111111111111111111111111111111111111112";
export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1vs";
export const USDC_TOKEN_PROGRAM_ID =
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
export const RAYDIUM_QUOTE_URL = "https://api.raydium.io/v2/amm/quote";
export const RAYDIUM_SWAP_URL = "https://api.raydium.io/v2/amm/swap";

// Type for the quote response
interface RaydiumQuote {
  priceImpactPct: number;
  outAmount: string;
}

// Type for swap response
interface SwapResponse {
  transaction: string;
}

export const getRaydiumQuote = async (
  amountIn: number,
  inputMint: string,
  outputMint: string
): Promise<RaydiumQuote | undefined> => {
  try {
    const response = await axios.get<RaydiumQuote>(
      `${RAYDIUM_QUOTE_URL}?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountIn}&slippageBps=50`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quote from Raydium:", error);
  }
};

export const executeRaydiumSwap = async (swapParams: {
  userPublicKey: string;
  amountIn: number;
  inputMint: string;
  outputMint: string;
}): Promise<SwapResponse | undefined> => {
  try {
    const response = await axios.post<SwapResponse>(
      RAYDIUM_SWAP_URL,
      swapParams
    );
    return response.data;
  } catch (error) {
    console.error("Error executing Raydium swap:", error);
  }
};
