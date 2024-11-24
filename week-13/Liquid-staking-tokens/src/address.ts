import { PublicKey } from "@solana/web3.js";

export const PUBLIC_KEY = new PublicKey("CPkZyUB27wz923zkJVaUfxufCbGcXyuM9HEc43Z6wGvf");

export const ATA_ADDRESS = new PublicKey("8mSftUkCcRVL2ht2JvNRXMNo87Xk6tSMnokZvkT6ZfLH");

export const TOKEN_MINT_ADDRESS = new PublicKey("GRURykEQMekWogEF8gHoKEiHtVuafu4aS1UMkwWYAvi4");

export const HELIUS_DATA = {
    "accountData": [
        {
            "account": "FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N",
            "nativeBalanceChange": -100015000,
            "tokenBalanceChanges": []
        },
        {
            "account": "CPkZyUB27wz923zkJVaUfxufCbGcXyuM9HEc43Z6wGvf",
            "nativeBalanceChange": 100000000,
            "tokenBalanceChanges": []
        },
        {
            "account": "11111111111111111111111111111111",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "ComputeBudget111111111111111111111111111111",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        }
    ],
    "description": "FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N transferred 0.1 SOL to CPkZyUB27wz923zkJVaUfxufCbGcXyuM9HEc43Z6wGvf.",
    "events": {},
    "fee": 15000,
    "feePayer": "FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N",
    "instructions": [
        {
            "accounts": [],
            "data": "3DVGviTXKAPH",
            "innerInstructions": [],
            "programId": "ComputeBudget111111111111111111111111111111"
        },
        {
            "accounts": [],
            "data": "LKoyXd",
            "innerInstructions": [],
            "programId": "ComputeBudget111111111111111111111111111111"
        },
        {
            "accounts": ["FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N", "CPkZyUB27wz923zkJVaUfxufCbGcXyuM9HEc43Z6wGvf"],
            "data": "3Bxs411Dtc7pkFQj",
            "innerInstructions": [],
            "programId": "11111111111111111111111111111111"
        }
    ],
    "nativeTransfers": [
        {
            "amount": 1000000000,
            "fromUserAccount": "FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N",
            "toUserAccount": "CPkZyUB27wz923zkJVaUfxufCbGcXyuM9HEc43Z6wGvf"
        }
    ],
    "signature": "QGAXXgZfA3PR1LCV3UdZtKkknkx1fqGfotuKG13agt4xSm5R5QAMWZGmDWDSKBLHFRPgRwNstF6QHGxpFYT7bZQ",
    "slot": 338295968,
    "source": "SYSTEM_PROGRAM",
    "timestamp": 1730952341,
    "tokenTransfers": [],
    "transactionError": null,
    "type": "TRANSFERi"
}
export const HELIUS_DATA_BURN ={
    "accountData":[{
        "account":"FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N",
        "nativeBalanceChange":-14999,
        "tokenBalanceChanges":[]},
        {"account":"8mSftUkCcRVL2ht2JvNRXMNo87Xk6tSMnokZvkT6ZfLH",
            "nativeBalanceChange":0,
            "tokenBalanceChanges":[{
                "mint":"GRURykEQMekWogEF8gHoKEiHtVuafu4aS1UMkwWYAvi4",
                "rawTokenAmount":{"decimals":9,"tokenAmount":"500000000"},
                "tokenAccount":"8mSftUkCcRVL2ht2JvNRXMNo87Xk6tSMnokZvkT6ZfLH",
                "userAccount":"CPkZyUB27wz923zkJVaUfxufCbGcXyuM9HEc43Z6wGvf"}]},
        {"account":"CoDdFra63FaL2Z6wjGAkrHaMVXSQCU43iPctZaGo6W8g",
            "nativeBalanceChange":0,
            "tokenBalanceChanges":[{
                "mint":"GRURykEQMekWogEF8gHoKEiHtVuafu4aS1UMkwWYAvi4",
                "rawTokenAmount":{"decimals":9,"tokenAmount":"-500000000"},
                "tokenAccount":"CoDdFra63FaL2Z6wjGAkrHaMVXSQCU43iPctZaGo6W8g",
                "userAccount":"FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N"}]},
        {"account":"ComputeBudget111111111111111111111111111111","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"GRURykEQMekWogEF8gHoKEiHtVuafu4aS1UMkwWYAvi4","nativeBalanceChange":0,"tokenBalanceChanges":[]},{"account":"TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb","nativeBalanceChange":0,"tokenBalanceChanges":[]}],"description":"","events":{},"fee":14999,"feePayer":"FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N","instructions":[{"accounts":[],"data":"3PXCWd4YE8jh","innerInstructions":[],"programId":"ComputeBudget111111111111111111111111111111"},{"accounts":[],"data":"JLEJN3","innerInstructions":[],"programId":"ComputeBudget111111111111111111111111111111"},{"accounts":["CoDdFra63FaL2Z6wjGAkrHaMVXSQCU43iPctZaGo6W8g","GRURykEQMekWogEF8gHoKEiHtVuafu4aS1UMkwWYAvi4","8mSftUkCcRVL2ht2JvNRXMNo87Xk6tSMnokZvkT6ZfLH","FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N","FUv5jWF7VsYMBDup3cLPdVond4AVbA7kSE1GFRuYcK1N"],"data":"g7Ez8CcPA4BjN","innerInstructions":[],"programId":"TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"}],"nativeTransfers":[],"signature":"4FLShqPwCjLhyBcp9me6S1eQ4U6KYZmH5RPTUWtdBnCgtRFTtYGWvnnLBB4vvoNhe2Jk9MHciksv3iVnBBzTbd4z","slot":338384800,"source":"UNKNOWN","timestamp":1730986226,"tokenTransfers":[],"transactionError":null,"type":"UNKNOWN"}

