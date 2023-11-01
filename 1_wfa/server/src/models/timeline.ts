import * as mongoose from 'mongoose';

export interface TimelineObject extends mongoose.Document {
    _id: any, 
    project: string,
    // point in time
    point: string
}

const schema = new mongoose.Schema ({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Timeline' },
    point: String,
}, {timestamps: true});

export const TimelineModel = mongoose.model<TimelineObject>('Timeline', schema);