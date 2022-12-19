import { AdminModel } from "../models/admin";
import { UserModel } from '../models/user';
import { PageModel } from '../models/page';
import { NavigationModel } from '../models/navigation';
import { MetricsModel } from '../models/metrics';

export async function login(data: any) {
    console.log('ADMIN - data username: ', data.username);
    return AdminModel.findOne({username: data.username})
        .then(admin => {
            if (!admin) return false;
            console.log('ADMIN PASSWORD = ', admin!.password);
            console.log('DATA  PASSWORD = ', data.password);
            if (admin!.password == data.password) {
                console.log('password CORRECT');
                return admin?._id.toString();
            } else {
                console.log('incorrect password');
                return false;
            }
        })
        .catch(err => {
            console.log(err); 
            return false;
        });
}

export async function fetchAll() {
    AdminModel.find({})
        .then(admins => admins)
        .catch(err => err);
}

export async function compileAllMetrics() {
    const pages = await PageModel.find({});
    const users = await UserModel.find({}).populate('projects', 'title');
    const metrics = await MetricsModel.find({});
    const navigation = await NavigationModel.find({});
    return {pages, users, metrics, navigation}
}

export async function checkAdminToken(id: string) {
    AdminModel.findOne({id: id})
        .then(admin => {
            console.log('ADMIN TOKEN CHECK. admin found: ', admin?.activeToken);
            return admin;
        })
        .catch(err => err);
}

// export async function addAdmin(data: any) {
//     console.log('creating new admin with data: ', data);
//     AdminModel.findOneAndUpdate(data, {$set: {newAdmin: data}}, { new: true, upsert: true})
//     .then(admin => {
//         console.log('PRE SAVE admin: ', admin);
//         admin.save();
//         return admin;
//     })  
//}

export async function addPage(pageData: any) {
    console.log('adding a page with data: ', pageData);
    const page = await PageModel.create({pageData})
        .then(page => {
            console.log('with page data: ', pageData);
            page.title = pageData.title;
            page.visits = 0;
            console.log('saving page as: ', page);
            page.save();
        });
    return page;
    // PageModel.findOneAndUpdate(pageData, {$set: {newPage: pageData}}, {new: true, upsert: true})
    //     .then(page => {
    //         console.log('saving page as: ', page);
            
    //         page.save();
    //         return page;
    //     })
    //     .catch(err => err);
}

export function addUser(userData: any) {
    if (!userData['projects']) userData['projects'] = [];
    userData['fullName'] = '';
    console.log('ADDING USER WITH DATA: ', userData);
    return UserModel.findOneAndUpdate(userData, {$set: {newPage: userData}}, {new: true, upsert: true})
        .then(user => {
            const fullName = user.firstName.concat(user.lastName);
            user.fullName = fullName;
            console.log('saving user: ', user);
            user.clientNumber = Math.floor(Math.random() * 3000 + 33333 + (Math.random() * 3000 + 11));
            user.save();
            return user;
        })
        .catch(err => console.error('REEEEE: ', err));
}