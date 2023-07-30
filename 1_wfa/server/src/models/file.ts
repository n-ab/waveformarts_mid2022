import * as mongoose from 'mongoose';

export interface FileObject extends mongoose.Document {
    _id: any, 
    title: string,
    description?: string,
    tasks: string, 
    email: string,
    filePath: string,
    associatedProject: string,
    companyProject?: string,
}

const schema = new mongoose.Schema({
    title: String,
    description: String || undefined,
    tasks: String,
    email: String,
    filePath: String,
    associatedProject: { type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    companyProject: String || undefined,
}, {timestamps: true});

export const FileModel = mongoose.model<FileObject>('File', schema);