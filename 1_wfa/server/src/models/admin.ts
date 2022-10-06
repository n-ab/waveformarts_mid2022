import * as mongoose from 'mongoose';

export interface AdminObject extends mongoose.Document {
    _id: any, 
    username: string,
    password: string,
    lastLogin: string,
}

const schema = new mongoose.Schema({
    username: String,
    password: String,
    lastLogin: String,
}, {timestamps: true});

export const AdminModel = mongoose.model<AdminObject>('Admin', schema);