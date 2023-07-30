import * as mongoose from 'mongoose';

export interface ProjectObject extends mongoose.Document {
    _id: any, 
    title: string,
    projectLeadName: string,
    // beginning stage field ^
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
    projectLeadName: String,
    // beginning stage field ^
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    filePaths: [String],
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    companyProject: String,
    email: String,
    description: String,
});

export const ProjectModel = mongoose.model<ProjectObject>('Project', schema);