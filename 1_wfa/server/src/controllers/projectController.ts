import { ProjectModel } from '../models/project';
import { UserModel } from '../models/user';
import { PairUsernumberEmailModel } from '../models/pairUsernumberEmail';
import * as bcrypt from 'bcryptjs';

// NEW PROJECT PATH WITH NO KNOWN USER
export async function createNewProject(data: any, filePaths: string[], user: any) {
    console.log('createNewProject() - data: ', data);
    console.log('createNewProject() - filePaths', filePaths);
    console.log('createNewProject() - user', user);
    
    // there is a req.user
    const project = await ProjectModel.create({ 
        title: data.title, 
        projectLeadName: data.projectLeadName,
        projectLeadEmail: data.projectLeadEmail,
        description: data.description, 
        number: Math.floor(Math.random() * 899999 + 100000) ,
        emailList: data.emailList, 
        filePaths: filePaths
    });
    // need to make path for if there's req.user or not
    return {projectId: project._id, projectNumber: project.number};
}

export async function getProjectById(data: any) {
    const project = await ProjectModel.findById(data).populate('users').then(project => project);
    return project;
}

// ----------------------------------
// EXISTING USER MAKING A NEW PROJECT
export async function createProject(data: any, userId: string) {
    const project = await ProjectModel.create({title: data.title, projectLead: userId, users: [userId], files: [], discussions: [], messages: []}).then(project => project);
    console.log('project: ', project);
    const user = await UserModel.findById(userId);
    await user?.projects.push(project._id);
    await user?.save();
    return project;
}


export async function addUserToProject(data: any) {
    const project = await ProjectModel.findById(data.projectId).then(project => project);
    project?.users.push(data.userId);
    await project?.save();
    return project?.users;
}

export async function addDiscussionToProject(data: any) {
    const project = await ProjectModel.findById(data.projectId).then(project => project);
    project?.discussions.push(data.discussionId);
    await project?.save();
    return project?.discussions;
}

export async function joinProject(projectId: string, userId: string) {
    const project = await ProjectModel.findById(projectId).then(project => project);
    project?.users.push(userId);
    project?.save();
    return project?.users;
}

export async function contact(data: any) {
    console.log('contact() - data = ', data);
    const randNum = Math.floor(Math.random() * 899999 + 100000);
    const unregisteredUser = await UserModel.create({
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: data.firstName + ' ' + data.lastName,
        company: data.company,
        email: data.email,
        password: '',
        clientNumber: randNum,
        fullyRegistered: false
    });
    const newPair = await PairUsernumberEmailModel.create({
        clientNumber: randNum,
        email: unregisteredUser.email
    });
    const project = await ProjectModel.create({
        title: data.projectTitle,
        messages: [data.initialMessage],
        companyProject: data.company,
        users: [unregisteredUser._id],
        email: data.email,
        projectLeadName: unregisteredUser.fullName,
        number: randNum - 1
    })
    return unregisteredUser;
}

export async function saveUnhashedPassword(password: any, userId: string) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const user = await UserModel.findById(userId);
    user!.password = hash;
    user?.save();
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