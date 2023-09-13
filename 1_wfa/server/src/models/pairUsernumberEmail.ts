import * as mongoose from 'mongoose';

export interface PairUsernumberEmailObject extends mongoose.Document {
    _id: any, 
    clientNumber: string,
    email: string
}

const schema = new mongoose.Schema({
    clientNumber: String,
    email: String
}, { timestamps: true });

export const PairUsernumberEmailModel = mongoose.model<PairUsernumberEmailObject>('PairUsernumberEmail', schema);