import * as mongoose from 'mongoose';

export interface ReportObject extends mongoose.Document {
    _id: any, 
    issue: string,
    additionalInfo: string,
    image: string,
    reportedBy: string,
}

const schema = new mongoose.Schema({
    issue: String,
    additionalInfo: String,
    filePath: String,
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const ReportModel = mongoose.model<ReportObject>('Report', schema);