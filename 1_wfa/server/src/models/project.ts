import * as mongoose from 'mongoose';

export interface ProjectObject extends mongoose.Document {
    _id: any, 
    title: string,
    projectLeadName: string,
    number: string,
    users: string[],
    filePaths: string[],
    discussions: string[],
    messages: string[],
    companyProject: string,
    email: string,
    description: string,
}

const schema = new mongoose.Schema ({
    title: String,
    email: String,
    filePaths: [String],
    description: String,
    companyProject: String,
    projectLeadName: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
});

export const ProjectModel = mongoose.model<ProjectObject>('Project', schema);