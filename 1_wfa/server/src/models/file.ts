import * as mongoose from 'mongoose';

export interface FileObject extends mongoose.Document {
    _id: any, 
    title: string,
    tasks: string, 
    email: string,
    filePath: string,
    associatedProject: string,
}

const schema = new mongoose.Schema({
    title: String,
    tasks: String,
    email: String,
    filePath: String,
    associatedProject: { type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
}, {timestamps: true});

export const FileModel = mongoose.model<FileObject>('File', schema);