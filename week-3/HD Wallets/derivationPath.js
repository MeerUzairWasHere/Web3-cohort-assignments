import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

const mnemonic = generateMnemonic();
const seed = mnemonicToSeedSync(mnemonic);
for (let i = 1; i <= 4; i++) {
  const path = `m/44'/501'/${i}'/0'`; // This is the derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log(
    `Account Number: ${i}
    SOL Public Key: ${Keypair.fromSecretKey(secret).publicKey.toBase58()}`
  );
  console.log(" ");
}
for (let i = 1; i <= 4; i++) {
  const path = `m/44'/60'/${i}'/0'`; // This is the derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log(
    `Account Number: ${i}
    ETH Public Key: ${Keypair.fromSecretKey(secret).publicKey.toBase58()}`
  );
  console.log(" ");
}

// m stands for master root
// 44' BIP standard
// 3rd one stands for coin type
// 0 -> BTC, 60 -> ETH, 501 -> SOL
// 4th for account number index

for (let i = 1; i <= 4; i++) {
  const path = `m/44'/0'/${i}'/0'`; // This is the derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log(
    `Account Number: ${i}
    BTC Public Key: ${Keypair.fromSecretKey(secret).publicKey.toBase58()}`
  );
  console.log(" ");
}
