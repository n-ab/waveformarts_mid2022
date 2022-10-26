import * as mongoose from 'mongoose';

export interface MessageObject extends mongoose.Document {
    _id: any, 
    
}

const schema = new mongoose.Schema({
}, {timestamps: true});

export const MessageModel = mongoose.model<MessageObject>('Message', schema);