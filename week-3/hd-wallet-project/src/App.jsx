import { useState } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <>
      <input
        type="text"
        required={true}
        onChange={(e) => setMnemonic(e.target.value)}
        value={mnemonic}
      ></input>
      <button
        onClick={async function () {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>
      <br />
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </>
  );
}

export default App;
