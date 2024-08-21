import { generateMnemonic } from 'bip39';

// Generate a 12-word mnemonic
const mnemonic = generateMnemonic();
console.log('Generated 12 words Mnemonic:', mnemonic);

// Generate a 24-word mnemonic using 256 bytes 
const mnemonic24 = generateMnemonic(256);
console.log('Generated 24 words Mnemonic:', mnemonic24);