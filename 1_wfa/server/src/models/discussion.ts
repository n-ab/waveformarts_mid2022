import * as mongoose from 'mongoose';

export interface DiscussionObject extends mongoose.Document {
    _id: any, 
    messages: string[],
    recentMessagePreview: string,
    thereIsRecentMessage: boolean,
    users: string[],
    project?: string[]
}

const schema = new mongoose.Schema({
    messages: [String],
    recentMessagePreview: String,
    thereIsRecentMessage: Boolean,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
}, {timestamps: true});

export const DiscussionModel = mongoose.model<DiscussionObject>('Discussion', schema);