import * as mongoose from 'mongoose';

export interface QuestionObject extends mongoose.Document {
    _id: any, 
    question: string,
    additionalInfo: string,
    image: string,
    askedBy: string,
}

const schema = new mongoose.Schema({
    question: String,
    additionalInfo: String,
    filePath: String,
    askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const QuestionModel = mongoose.model<QuestionObject>('Question', schema);