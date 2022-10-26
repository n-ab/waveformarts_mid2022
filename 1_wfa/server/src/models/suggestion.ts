import * as mongoose from 'mongoose';

export interface SuggestionObject extends mongoose.Document {
    _id: any, 
    suggestion: string,
    suggestedBy: string,
}

const schema = new mongoose.Schema({
    suggestion: String,
    suggestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const SuggestionModel = mongoose.model<SuggestionObject>('Suggestion', schema);