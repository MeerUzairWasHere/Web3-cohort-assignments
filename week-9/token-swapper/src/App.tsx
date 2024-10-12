import "./App.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import Swapper from "./components/Swapper";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <nav className="flex items-center justify-between p-4 bg-background shadow-md">
              {/* Logo or Title */}
              <div className="text-xl font-bold text-primary">Token Swapper</div>

              {/* Wallet Button with ShadCN styling */}
              <div className="flex items-center space-x-4">
                <Button asChild>
                  <WalletMultiButton />
                </Button>
              </div>
            </nav>

            <div className="p-20">
              <Swapper />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
