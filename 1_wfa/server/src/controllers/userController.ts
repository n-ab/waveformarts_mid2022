import { UserModel } from '../models/user';
import { QuestionModel } from '../models/question';
import { ReportModel } from '../models/report';
import { SuggestionModel } from '../models/suggestion';
import { MessageModel } from '../models/message';
import { DiscussionModel } from '../models/discussion';
import * as bcrypt from 'bcryptjs';

export async function register(data: any) {
    console.log('Registering new user with data: ', data);
    const encryptedPassword = await encryptPassword(data.password);
    return UserModel.create({
        status: true,
        role: 'user',
        firstName: data.firstName,
        lastName: data.lastName,
        password: encryptedPassword,
        nameAbbreviation: data.firstName[0].toUpperCase() + data.lastName.toLowerCase(),
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        username: data.email,
        company: '',
        projects: [],
        clientNumber: Math.floor(Math.random() * 899999 + 100000),
        discussions: [],
        messagesSent: [],
        readMessages: [],
        starredSounds: [],
        downloads: [],
        uploads: [],
        plan: 'basic',
        questions: [],
        reports: [],
        suggestions: [],
    })
    .then(user => {
        console.log('saved user with clientNumber: ', user.clientNumber);
        return user;
    })
}

export async function encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export async function checkAttemptedPassword(attemptedPassword: string, userId: string) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(attemptedPassword, salt);
    const user = await UserModel.findById(userId);
    console.log('user!.password = ', user!.password);
    console.log('attempted password = ', hash);
    if (user!.password == hash) return true;
    return false;
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

export async function reportIssue(userId: string, issue: any) {
    const user = await UserModel.findById(userId);
    console.log('issue = ', issue);
    const report = await ReportModel.create({issue: issue.complaint, additionalInfo: issue.additionalInfo, image: issue.imageFilePath, reportedBy: userId}).then(report => report._id).catch(err => console.log(err));
    user?.reports.push(report);
    await user?.save();
    return report;
}

export async function makeSuggestion(userId: string, suggestion: any) {
    const user = await UserModel.findById(userId);
    console.log('suggestion = ', suggestion);
    // const report = await ReportModel.create({issue: issue.complaint, additionalInfo: issue.additionalInfo, image: issue.imageFilePath, reportedBy: userId}).then(report => report._id).catch(err => console.log(err));
    const suggestionMade = await SuggestionModel.create({suggestion: suggestion.suggestion, suggestedBy: userId}).then(suggestion => suggestion?._id).catch(err => console.log('error: ', err));
    user?.reports.push(suggestionMade);
    await user?.save();
    return suggestionMade;
}

export async function fetchMessages(userId: string) {
    const user = await UserModel.findById(userId);
    return user?.messagesSent;
}

export async function fetchProjects(userId: string) {
    const user = await UserModel.findById(userId);
    return user?.projects;
}

export async function addMessageToDiscussion(content: string, discussionId: string, userId: string) {
    const message = await MessageModel.create({content: content, sender: userId});
    const discussion = await DiscussionModel.findById(discussionId);
    discussion?.messages.push(message._id);
    discussion?.save();
    addMessageIdToSender(message, userId);
}

export async function addMessageIdToSender(message: any, senderId: string) {
    const sender = await UserModel.findById(senderId);
    sender?.messagesSent.push(message);
    await sender?.save();
    return sender;
}

export async function fetchPopulatedUserData(userId: string) {
    const user = await UserModel.findById(userId)
        .populate('firstName')
        .populate('lastName')
        .populate('email')
        .populate('username')
        .populate('company');
    console.log('USER SHOULD BE FULLY POPULATED -----', user);
    return user;
}