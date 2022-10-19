import * as mongoose from 'mongoose';

export interface AdminObject extends mongoose.Document {
    _id: any, 
    username: string,
    password: string,
    lastLogin: string,
    activeToken: string,
    counter: number,
}

const schema = new mongoose.Schema({
    username: String,
    password: String,
    lastLogin: String,
    activeToken: { type: mongoose.Schema.Types.ObjectId, ref: 'Token' },
    counter: Number,
}, {timestamps: true});

export const AdminModel = mongoose.model<AdminObject>('Admin', schema);