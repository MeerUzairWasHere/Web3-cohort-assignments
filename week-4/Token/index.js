const {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} = require("@solana/spl-token");

const {
  Keypair,
  Connection,
  clusterApiUrl,
  TOKEN_PROGRAM_ID,
  PublicKey,
} = require("@solana/web3.js");

const payer = Keypair.fromSecretKey(
  Uint8Array.from([
    86, 80, 35, 23, 201, 78, 192, 54, 117, 131, 47, 93, 160, 115, 182, 178, 24,
    233, 30, 6, 28, 29, 71, 31, 120, 158, 243, 47, 0, 94, 126, 34, 200, 148,
    203, 235, 242, 90, 128, 75, 192, 161, 229, 55, 151, 79, 194, 222, 245, 62,
    166, 118, 223, 21, 158, 187, 76, 89, 248, 161, 165, 59, 139, 242,
  ])
);

const mintAthority = payer;

const connection = new Connection(clusterApiUrl("devnet"));

async function createMintForToken(payer, mintAuthority) {
  const mint = await createMint(
    connection,
    payer,
    mintAuthority,
    null,
    6,
    TOKEN_PROGRAM_ID
  );
  console.log("Mint created at", mint.toBase58());
  return mint;
}

async function mintNewTokens(mint, to, amount) {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    new PublicKey(to)
  );

  console.log("Token account created at", tokenAccount.address.toBase58());
  await mintTo(connection, payer, mint, tokenAccount.address, payer, amount);
  console.log("Minted", amount, "tokens to", tokenAccount.address.toBase58());
}

async function main() {
  const mint = await createMintForToken(payer, mintAthority.publicKey);
  await mintNewTokens(mint, mintAthority.publicKey, 100);
}

main();
