import * as mongoose from 'mongoose';

export interface ClickObject extends mongoose.Document {
    _id: any, 
    navigatingTo: string,
    navigatingFrom: string,
    timeElapsedSinceLastClick: number,
}

const schema = new mongoose.Schema({
    navigatingTo: String,
    navigatingFrom: String,
    timeElapsedSinceLastClick: Number,
});

export const ClickModel = mongoose.model<ClickObject>('Click', schema);