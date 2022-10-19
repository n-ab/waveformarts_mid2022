import mongoose from 'mongoose';
import { TokenModel } from '../models/token';
import { AdminModel } from '../models/admin';

export async function addTokenToFreshAdmin(admin: any) {
    console.log('CREATING TOKEN for ', admin);
    const id = new mongoose.Types.ObjectId();
    const date = new Date();
    const token = {
        _id: id,
        value: id, 
        createdAt: date,
        lifespan: 180,
        owner: admin
    }
    console.log('TOKEN TOKEN REE = ', token);
    TokenModel.findOneAndUpdate(token, {$set: { newToken: token }}, { new: true, upsert: true })
        .then(token => {
            console.log('token generated and saved: ', token._id);
            token.save();
            AdminModel.findOneAndUpdate({_id: admin}).then(admin => { admin!.activeToken = token._id; admin?.save(); })
            return token._id;
        })
        .catch(err => err);
}