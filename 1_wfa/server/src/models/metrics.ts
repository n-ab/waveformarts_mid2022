import * as mongoose from 'mongoose';

export interface MetricsObject extends mongoose.Document {
    _id: any, 
    month: string, // 1st of month to last day of month
    pages: string[],
    navigation: string
}

const schema = new mongoose.Schema({
    month: String,
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
    navigation: { type: mongoose.Schema.Types.ObjectId, ref: 'Navigation' }
});

export const MetricsModel = mongoose.model<MetricsObject>('Metrics', schema);