import { UserModel } from '../models/user';

export function register(data: any) {
    console.log('Registering new user with data: ');
    console.log(data);
    return UserModel.findOneAndUpdate(data, {$set: {newUser: data}}, { new: true, upsert: true})
    .then(user => {
        console.log('SUCCESS - New user with email: ', user.email);
        user.role = 'user';
        user.username = data.email;
        user.save();
        return user;
    });   
}

export async function fetchFiles(id: string) {
    const user = await UserModel.findById(id).catch(err => console.log('error fetching files: ', err));   
    return user;
}