import * as mongoose from 'mongoose';
import { userInfo } from 'os';

export interface UserObject extends mongoose.Document {
    _id: any,
    registered: boolean,
    role: string,
    firstName: string,
    lastName: string,
    nameAbbreviation: string,
    fullName: string,
    password: string,
    tempPassword: string,
    downloadDestinationPath: string,
    email: string,
    username: string,
    company: string,
    projects: string[],
    clientNumber: number,
    discussions: object[],
    messagesSent: object[],
    readMessages: string[],
    starredSounds: string[], 
    downloads: string[],
    uploads: string[],
    plan: string,
    questions: string[],
    reports: string[],
    suggestions: string[],
}

const schema = new mongoose.Schema({
    role: String,
    email: String,
    registered: Boolean,
    company: String,
    lastName: String,
    fullName: String,
    password: String,
    username: String,
    firstName: String,
    tempPassword: String,
    downloadDestinationPath: String,
    clientNumber: Number,
    nameAbbreviation: String,
    readMessages: [String],
    starredSounds: [String],
    plan: { type: String, default: 'standard'},
    uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    downloads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    suggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' }],
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    messagesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
}, { timestamps: true });

export const UserModel = mongoose.model<UserObject>('User', schema);