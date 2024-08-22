import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  return (
    <div>
      <button
        onClick={async function () {
          if (mnemonic == "") return alert("Enter or Generate new phrase");
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet]);
        }}
      >
        Add ETH wallet
      </button>

      {addresses.map((p, i) => {
        console.log(p.address);
        return (
          <div key={i}>
            <p>ETH Account: {i}</p>
            <p>Public Key: {p?.address}</p>
            <p>Private Key: {p?.privateKey}</p>
          </div>
        );
      })}
    </div>
  );
};
