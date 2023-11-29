import * as mongoose from 'mongoose';

// you just need to be able to link a user with their index

export interface TeamListObject extends mongoose.Document {
    _id: any,
    project: string,
    users: string[],
    indices: number[]
}

const schema = new mongoose.Schema({
    project: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    indices: [Number]
}, { timestamps: true });


export const TeamListModel = mongoose.model<TeamListObject>('TeamList', schema);