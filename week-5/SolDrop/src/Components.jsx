import { useWallet } from "@solana/wallet-adapter-react";
import { RequestAirdrop } from "./RequestAirdrop";
import { SendTokens } from "./SendTokens";
import { ShowSolBalance } from "./ShowSolBalance";
import { SignMessage } from "./SignMessage";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

export const Components = () => {
  const wallet = useWallet();
  const isConnected = wallet.connected;
  return isConnected ? (
    <>
      <div className="container">
        <div className="two">
          <RequestAirdrop />
        </div>
        <WalletMultiButton />
      </div>
    </>
  ) : (
    <div className="center">
      <WalletMultiButton />
    </div>
  );
};
