import * as mongoose from 'mongoose';

export interface ProjectObject extends mongoose.Document {
    _id: any, 
    title: string,
    projectLeadName: string,
    projectLeadEmail: string,
    description: string,
    number: number,
    emailList: string[],
    filePaths: string[],
    users: string[],
    discussions: string[],
    messages: string[],
    
}

const schema = new mongoose.Schema ({
    title: String,
    projectLeadName: String,
    projectLeadEmail: String,
    description: String,
    number: Number,
    emailList: [String],
    filePaths: [String],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    messages: [String],
});

export const ProjectModel = mongoose.model<ProjectObject>('Project', schema);