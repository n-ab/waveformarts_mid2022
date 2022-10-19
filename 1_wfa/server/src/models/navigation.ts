import * as mongoose from 'mongoose';

export interface NavigationObject extends mongoose.Document {
    _id: any, 
    pageName: string,
    timesNavigatedToThisYear: number,
    timesNavigatedToThisMonth: number,
    timesNavigatedToThisWeek: number,
    timesNavigatedToToday: number
}

const schema = new mongoose.Schema({
    pageName: String,
    timesNavigatedToThisYear: Number,
    timesNavigatedToThisMonth: Number,
    timesNavigatedToThisWeek: Number,
    timesNavigatedToToday: Number
});

export const NavigationModel = mongoose.model<NavigationObject>('Navigation', schema);