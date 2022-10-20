import * as mongoose from 'mongoose';

export interface UserObject extends mongoose.Document {
    _id: any,
    status: boolean,
    role: string,
    firstName: string,
    lastName: string,
    nameAbbreviation: string,
    password: string,
    email: string,
    username: string,
    company: string,
    project: string[],
    clientNumber: number,
    discussions: object[],
    messages: object[],
    readMessages: string[],
    starredSounds: string[], 
    downloads: string[],
    uploads: string[]
}

const schema = new mongoose.Schema({
    status: Boolean,
    role: String,
    firstName: String,
    lastName: String,
    nameAbbreviation: String,
    password: String,
    email: String,
    username: String,
    company: String,
    project: [String],
    clientNumber: Number,
    discussions: [Object],
    messages: [Object],
    readMessages: [String],
    starredSounds: [String],
    downloads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
}, { timestamps: true });

export const UserModel = mongoose.model<UserObject>('User', schema);