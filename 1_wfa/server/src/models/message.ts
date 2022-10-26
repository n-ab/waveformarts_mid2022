import * as mongoose from 'mongoose';

export interface MessageObject extends mongoose.Document {
    _id: any, 
    content: string,
    recipient: string,
    sender: string,
    discussion: string
}

const schema = new mongoose.Schema({
    content: String,
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    discussion: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion'},
}, {timestamps: true});

export const MessageModel = mongoose.model<MessageObject>('Message', schema);