import * as mongoose from 'mongoose';

export interface DiscussionObject extends mongoose.Document {
    _id: any, 
    messages: string[],
    users: string[],
    project?: string[]
}

const schema = new mongoose.Schema({
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
}, {timestamps: true});

export const DiscussionModel = mongoose.model<DiscussionObject>('Discussion', schema);