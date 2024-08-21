import { generateMnemonic, mnemonicToSeedSync } from "bip39";

//generate 24 words Mnemonic
const mnemonic = generateMnemonic(256);
console.log("Generated Mnemonic:", mnemonic);

// Convert Mnemmonic to seed phrase
const seed = mnemonicToSeedSync(mnemonic);
