import mongoose from "mongoose";

export interface IWebhookEvent extends Document {
    eventType: string;
    rawData: any;
    processed: boolean;
    createdAt: Date;
}

const webhookEventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true,
    },
    rawData: {
        type: Object,
        required: true,
    },
    processed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

export const WebhookEvent =  mongoose.model<IWebhookEvent>("WebhookEvent", webhookEventSchema);