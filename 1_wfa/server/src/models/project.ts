import * as mongoose from 'mongoose';

export interface FilePath {
    filePath: string,
    fileType: string
}

export interface ProjectObject extends mongoose.Document {
    _id: any, 
    title: string,
    projectLeadName: string,
    projectLeadEmail: string,
    description: string,
    number: number,
    emailList: string[],
    fileType: string,
    filePaths: [
        { filePath: string,
          fileType: string}
    ],
    hasMusicStem: boolean,
    musicStemFilePath: string,
    hasEffectsStem: boolean,
    effectsStemFilePath: string,
    hasDialogStem: boolean, 
    dialogStemFilePath: string,
    hasAmbienceStem: boolean,
    ambienceStemFilePath: string
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
    fileType: String,
    filePaths: [{
        filePath: String,
        fileType: String,
    }],
    hasMusicStem: Boolean,
    musicStemFilePath: String,
    hasEffectsStem: Boolean,
    effectsStemFilePath: String,
    hasDialogStem: Boolean, 
    dialogStemFilePath: String,
    hasAmbienceStem: Boolean,
    ambienceStemFilePath: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    messages: [String],
});

export const ProjectModel = mongoose.model<ProjectObject>('Project', schema);