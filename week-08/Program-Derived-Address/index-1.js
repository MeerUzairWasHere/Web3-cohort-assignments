const { PublicKey } = require('@solana/web3.js');
const { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// Replace these with your actual values
const userAddress = new PublicKey('H6iPX2qpqGLFAs7JCusN9AGNtJKqR6SCNkUDyEgoZeEr');
const tokenMintAddress = new PublicKey('4BeVikXDidQtcajSkEyzUPfR4jYw7rkZ5Mi4xDLE1xu5');

// Derive the associated token address
const getAssociatedTokenAddress = (mintAddress, ownerAddress) => {
    return PublicKey.findProgramAddressSync(
        [
            ownerAddress.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintAddress.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
};

const [associatedTokenAddress, bump] = getAssociatedTokenAddress(tokenMintAddress, userAddress);
console.log(`Associated Token Address: ${associatedTokenAddress.toBase58()}, bump: ${bump}`);
