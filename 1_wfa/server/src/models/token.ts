import * as mongoose from 'mongoose';

export interface TokenObject extends mongoose.Document {
    _id: any, 
    value: string,
    lifespan: number, // 3 minutes after login
    createdAt: number,
    owner: string,
}

const schema = new mongoose.Schema({
    value: String,
    lifespan: Number,
    createdAt: { type: Date, expires: 60, default: Date.now},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, {timestamps: true, expireAfterSeconds: 20});

export const TokenModel = mongoose.model<TokenObject>('Token', schema);