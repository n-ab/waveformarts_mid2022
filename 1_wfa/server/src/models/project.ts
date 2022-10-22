import * as mongoose from 'mongoose';

export interface ProjectObject extends mongoose.Document {
    _id: any, 
    title: string,
    projectLead: string,
    users: string[],
    files: string[],
    discussions: string[],
    messages: string[],
}

const schema = new mongoose.Schema ({
    title: String,
    projectLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

export const ProjectModel = mongoose.model<ProjectObject>('Project', schema);