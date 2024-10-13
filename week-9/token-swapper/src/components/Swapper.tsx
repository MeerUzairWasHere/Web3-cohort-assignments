import { useEffect, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import {
  getRaydiumQuote,
  SOL_MINT,
  SOL_TOKEN_PROGRAM_ID,
  USDC_MINT,
} from "@/lib/actions";
import { API_URLS } from "@raydium-io/raydium-sdk-v2";

export function Swapper() {
  const { connection } = useConnection(); // Solana connection
  const { publicKey } = useWallet(); // Wallet publicKey
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [tokens, setTokens] = useState<any[]>([]); // State to store token accounts

  useEffect(() => {
    if (!publicKey) return;
    // Fetch all tokens for the connected wallet
    const fetchSolanaTokens = async () => {
      try {
        const solanaTokenAccounts =
          await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: new PublicKey(SOL_TOKEN_PROGRAM_ID),
          });
        // Extract tokens and balances
        const tokenList = solanaTokenAccounts.value.map((accountInfo) => {
          const accountData = accountInfo.account.data.parsed.info;
          return {
            mint: accountData.mint,
            tokenAmount: accountData.tokenAmount.uiAmount,
          };
        });
        console.log(tokenList);
        setTokens(tokenList); // Store token data in state
      } catch (error) {
        console.error("Error fetching token accounts:", error);
      }
    };
    async function get() {
      const res = await getRaydiumQuote(100000000, SOL_MINT, USDC_MINT);
      console.log(res);
    }
    get();
    fetchSolanaTokens();
  }, [connection, publicKey]);
  const handleSwap = () => {
    // Placeholder for swap logic
    console.log(`Swapping ${fromAmount} ${fromToken} to ${toToken}`);
    // Here you would typically call an API or smart contract to perform the swap
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Placeholder for conversion logic
    setToAmount(value); // In a real app, you'd calculate this based on exchange rates
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Swap Tokens
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fromAmount" className="text-sm font-medium">
            From
          </label>
          <div className="flex space-x-2">
            <Input
              id="fromAmount"
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="flex-grow"
            />
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="DAI">DAI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setFromToken(toToken);
              setToToken(fromToken);
              setFromAmount(toAmount);
              setToAmount(fromAmount);
            }}
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <label htmlFor="toAmount" className="text-sm font-medium">
            To
          </label>
          <div className="flex space-x-2">
            <Input
              id="toAmount"
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="flex-grow"
            />
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="DAI">DAI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSwap}>
          Swap
        </Button>
      </CardFooter>
    </Card>
  );
}
