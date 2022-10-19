import * as mongoose from 'mongoose';

export interface PageObject extends mongoose.Document {
    _id: any, 
    title: string,
    visits: number, 
    navigatedFrom: [{
        title: string,
        count: number
    }],
}

const schema = new mongoose.Schema({
    title: String,
    visits: Number, 
    navigatedFrom: [{
        title: String,
        count: Number
    }],
});

export const PageModel = mongoose.model<PageObject>('Page', schema);