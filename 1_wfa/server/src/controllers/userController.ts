import { UserModel } from '../models/user';
import { QuestionModel } from '../models/question';

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

export async function changePassword(passwordData: {newPassword: string, oldPassword: string}, userId: string) {
    return UserModel.findOneAndUpdate({id: userId})
        .then(async user => {
            user!.password = passwordData.newPassword;
            await user!.save();
            return user!;
        })
}

export async function changeEmail(emailData: {newEmail: string, oldEmail: string}, userId: string) {
    return UserModel.findOneAndUpdate({id: userId})
        .then(async user => {
            user!.email = emailData.newEmail;
            await user!.save();
            return user!;
        })
}

export async function fetchPlan(userId: string) {
    console.log('userId: ', userId);
    
    return UserModel.findById(userId)
        .then(user => {
            console.log('user: ', user);
            return user?.plan;
        })
        .catch(err => err);
}

export async function addQuestion(userId: string, questionContent: any) {
    const user = await UserModel.findById(userId);
    console.log('question content = ', questionContent);
    const question = await QuestionModel.create({question: questionContent.question, additionalInfo: questionContent.additionalInfo, image: questionContent.imageFilePath, askedBy: userId}).then(question => question._id).catch(err => console.log(err));
    user?.questions.push(question);
    await user?.save();
    return question;
}