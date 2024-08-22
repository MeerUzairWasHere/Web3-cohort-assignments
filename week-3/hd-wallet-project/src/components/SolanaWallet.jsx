import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keys, setKeys] = useState([]); // Combined array for public and private keys

  return (
    <div>
      <button
        onClick={async function () {
          if (mnemonic === "") return alert("Enter or Generate new phrase");
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          const privateKey = bs58.encode(Buffer.from(secret));

          setKeys([...keys, { publicKey: keypair.publicKey.toBase58(), privateKey }]);
          setCurrentIndex(currentIndex + 1);
        }}
      >
        Add SOL wallet
      </button>
      {keys.map((key, i) => (
        <div key={i}>
          <p>SOL Account: {i}</p>
          <p>Public Key: {key.publicKey}</p>
          <p>Private Key: {key.privateKey}</p>
        </div>
      ))}
    </div>
  );
}
