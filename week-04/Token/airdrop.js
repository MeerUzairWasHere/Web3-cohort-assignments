const {Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey} = require('@solana/web3.js');

const connection = new Connection(clusterApiUrl('devnet'));

async function airdrop(publicKey, amount) {
    const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
    await connection.confirmTransaction({signature: airdropSignature})
}

airdrop("EVz8tUi4kFemN43T2wwdvYbf6GF5TapzoD6SpCSjU9AH", LAMPORTS_PER_SOL).then(signature => {
    console.log('Airdrop signature:', signature);
});