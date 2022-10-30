import * as mongoose from 'mongoose';

export interface UserObject extends mongoose.Document {
    _id: any,
    status: boolean,
    role: string,
    firstName: string,
    lastName: string,
    nameAbbreviation: string,
    password: string,
    tempPassword: string,
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
    status: Boolean,
    role: String,
    firstName: String,
    lastName: String,
    nameAbbreviation: String,
    password: String,
    tempPassword: String,
    email: String,
    username: String,
    company: String,
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    clientNumber: Number,
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    messagesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    readMessages: [String],
    starredSounds: [String],
    downloads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    plan: { type: String, default: 'standard'},
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
    suggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' }],
}, { timestamps: true });

export const UserModel = mongoose.model<UserObject>('User', schema);