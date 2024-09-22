// Create a new account with data and rent
const { Keypair, Connection, SystemProgram, Transaction } = require('@solana/web3.js');

const payer = Keypair.fromSecretKey(Uint8Array.from([42,243,78,195,142,194,45,18,24,105,99,183,119,184,6,73,56,12,152,1,43,218,246,213,222,65,60,11,50,39,63,244,239,49,177,84,144,204,227,36,79,124,171,203,83,51,130,205,112,18,155,165,224,182,194,40,44,122,168,192,69,255,125,215]));


const connection = new Connection("https://api.devnet.solana.com");
async function main() {
    const newAccount = Keypair.generate();
    const TOTAL_BYTES = 165;
    const lamports = await connection.getMinimumBalanceForRentExemption(TOTAL_BYTES);
    const transaction = new Transaction();
    transaction.add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: newAccount.publicKey,
            lamports: lamports,
            space: TOTAL_BYTES,
            programId: SystemProgram.programId,
        }),
    );

    await connection.sendTransaction(transaction, [payer, newAccount]);
    console.log(`New account created at ${newAccount.publicKey.toBase58()}`);
}

main();