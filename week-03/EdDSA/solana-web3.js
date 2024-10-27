import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

// Generate a new keypair
const keypair = Keypair.generate();

// Extract the public and private keys
const publicKey = keypair.publicKey.toString();
const secretKey = keypair.secretKey;

// Display the keys
console.log("Public Key:", publicKey);
console.log("Private Key (Secret Key):", secretKey);

// Convert the message "MeerUzairWasHere!" to a Uint8Array
const message1 = new TextEncoder().encode("MeerUzairWasHere!");

const message2 = new TextEncoder().encode("MeerUzairWasNotHere!");

const signature = nacl.sign.detached(message1, secretKey);

const result1 = nacl.sign.detached.verify(
  message1,
  signature,
  keypair.publicKey.toBytes()
);

const result2 = nacl.sign.detached.verify(
  message2,
  signature,
  keypair.publicKey.toBytes()
);

console.log("Result 1: " + result1);
console.log("Result 2: " + result2); //uses wrong message.
