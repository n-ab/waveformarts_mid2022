import * as mongoose from 'mongoose';

export interface PlanObject extends mongoose.Document {
    _id: any,
    title: string,
}

const schema = new mongoose.Schema({
    title: String,
});

export const PlanModel = mongoose.model<PlanObject>('Plan', schema);