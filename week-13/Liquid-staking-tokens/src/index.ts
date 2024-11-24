require("dotenv").config();
import express, { Request, Response } from "express";
import {
  burnTokensAndSendNativeTokens,
  mintTokens,
} from "./mintTokens";
import { HELIUS_DATA, PUBLIC_KEY, HELIUS_DATA_BURN } from "./address";
import { PublicKey } from "@solana/web3.js";
import { connectToDB } from "./config/database";
import { WebhookEvent } from "./WebhookEvent";

const startServer = async () => {
  const app = express();
  app.use(express.json());

  await connectToDB();

  app.post("/helius", async (req: Request, res: Response) => {
    try {
      const data = req.body?.[0];
      console.log({ eventType: data?.type });
      const webhookEvent = await WebhookEvent.create({
        eventType: data?.type,
        rawData: data,
      });
      processWebhook(data)
        .then(() => {
          webhookEvent.processed = true;
          webhookEvent.save();
          console.log("Event Processed");
        })
        .catch((error) => {
          console.log("failed to process event", error);
        });

      res.send("Event Captured");
    } catch (error) {
      console.log(error);
      res.status(500).send("Event Failed");
    }
  });

  const processWebhook = async (data: any) => {
    try {
      const type = "TRANSFER";
      let fromAddress = data?.nativeTransfers?.[0]?.fromUserAccount;
      let toAddress = data?.nativeTransfers?.[0]?.toUserAccount;
      let amount = data?.nativeTransfers?.[0]?.amount;

      if (data?.type === type && toAddress === PUBLIC_KEY.toBase58()) {
        fromAddress = data?.nativeTransfers?.[0]?.fromUserAccount;
        amount = data?.nativeTransfers?.[0]?.amount;
        await mintTokens(new PublicKey(fromAddress), Number(amount));
      } else {
        let myAccountData = data?.accountData?.find(
          (account: any) =>
            account.account === "8mSftUkCcRVL2ht2JvNRXMNo87Xk6tSMnokZvkT6ZfLH"
        );
        console.log({ myAccountData });
        if (myAccountData) {
          let senderAccount = data?.accountData?.find(
            (account: any) =>
              account?.tokenBalanceChanges?.[0]?.rawTokenAmount?.tokenAmount ===
              "-" +
                myAccountData?.tokenBalanceChanges?.[0]?.rawTokenAmount
                  ?.tokenAmount
          );
          console.log(senderAccount);
          if (senderAccount) {
            let senderAddress = new PublicKey(
              senderAccount.tokenBalanceChanges[0].userAccount
            );
            let amount = Number(
              myAccountData.tokenBalanceChanges[0].rawTokenAmount.tokenAmount
            );
            await burnTokensAndSendNativeTokens(senderAddress, amount);
          }
        }
      }
    } catch (error) {
      console.log(`Failed to process webhook:`, error);
    }
  };

  app.listen(3000, () => {
    console.log("Server is running on port 3000, hello");
  });
};

startServer();
