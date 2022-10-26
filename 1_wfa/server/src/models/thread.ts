import * as mongoose from 'mongoose';

export interface ThreadObject extends mongoose.Document {
    _id: any, 

}

const schema = new mongoose.Schema({
}, {timestamps: true});

export const ThreadModel = mongoose.model<ThreadObject>('Thread', schema);