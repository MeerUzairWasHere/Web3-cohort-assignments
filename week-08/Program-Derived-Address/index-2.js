const { PublicKey } = require('@solana/web3.js');
const { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// Replace these with your actual values
const userAddress = new PublicKey('H6iPX2qpqGLFAs7JCusN9AGNtJKqR6SCNkUDyEgoZeEr');
const tokenMintAddress = new PublicKey('4BeVikXDidQtcajSkEyzUPfR4jYw7rkZ5Mi4xDLE1xu5');

const PDA = PublicKey.createProgramAddressSync(
  [userAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer(), Buffer.from([254])],
  ASSOCIATED_TOKEN_PROGRAM_ID,
);
 
console.log(`PDA: ${PDA}`);