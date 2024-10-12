import { useState } from "react";
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

export function Swapper() {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

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
