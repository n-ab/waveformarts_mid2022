import { ProjectModel, ProjectObject } from '../models/project';
import { UserModel, UserObject } from '../models/user';
import { DiscussionModel, DiscussionObject } from '../models/discussion';
import { PairUsernumberEmailModel } from '../models/pairUsernumberEmail';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcryptjs';

export async function startProject(projectData: any, userId: string) {
    console.log('starting project with data: ', projectData.title);
    const project = await ProjectModel.create({
        title: projectData.title,
        projectLeadName: projectData.projectLeadName,
        projectLeadEmail: projectData.projectLeadEmail,
        emailList: projectData.emailList,
        description: projectData.description,
        number: Math.floor(Math.random() * 8999999 + 1000000),
        users: [userId]
    }).catch();
    const user = await UserModel.findById(userId)
        .then(user => {
            user?.projects.push(project._id);
            user?.save();
        })
        .catch(err => console.log(err))
    return project.title;
}

// NEW PROJECT PATH WITH NO KNOWN USER
export async function createNewProject(data: any, filePaths: string[], userId: any) {
    // console.log('5 5 5 5');
    if (userId !== '') {
        const user = await UserModel.findById(userId).then(user => user).catch(err => err);
        if (user?.projects.indexOf(data.title)) {
            // console.log('111 user?.projects.indexOf(data.title) ', user?.projects.indexOf(data.title));
        } else {
            // console.log('222 user?.projects.indexOf(data.title) ', user?.projects.indexOf(data.title));
        }
        const project = await ProjectModel.create({ 
            title: data.title, 
            projectLeadName: data.projectLeadName,
            projectLeadEmail: data.projectLeadEmail,
            description: data.description, 
            number: Math.floor(Math.random() * 8999999 + 1000000) ,
            emailList: data.emailList, 
            filePaths: filePaths
        });
        user?.projects.push(project._id);
        user?.save();
        if (userId) { project.users.push(userId); }
        return {projectId: project._id, name: project.title}
    } else {
        const project = await ProjectModel.create({ 
            title: data.title, 
            projectLeadName: data.projectLeadName,
            projectLeadEmail: data.projectLeadEmail,
            description: data.description, 
            number: Math.floor(Math.random() * 899999 + 100000) ,
            emailList: data.emailList, 
            filePaths: filePaths,
            plan: '',
        });
        return {projectId: project._id};
    }
}

export async function fetchProjects(userId: string) {
    const user = await UserModel.findById(userId).then(user => user).catch(err => err);
    const projectIds = user?.projects;
    if (!projectIds) {
        return [];
    }
    const projects = await Promise.all(projectIds!.map(async (id: string) => {
        const project = await ProjectModel.findById(id);
        if (project) {
            const { title, projectLeadName, messages, _id } = project;
            return {title, projectLeadName, messages, _id}
        } else {
            return null;
        }
    }))
    const filteredProjects = await projects.filter((project) => project !== null);
    return filteredProjects;
}


export async function fetchSingleProjectData(id: string) {
    if (id) {
        const project = await ProjectModel.findById(id)
            .then(project => project)
            .catch(err => {
                console.log('error fetching single project: ', err); 
                return err;
            });
        return project;
    } else {
        return false;
    }
}

export async function createProject(data: any, userId: string) {
    const project = await ProjectModel.create({title: data.title, projectLead: userId, users: [userId], files: [], discussions: [], messages: []}).then(project => project);
    console.log('project: ', project);
    const user = await UserModel.findById(userId);
    await user?.projects.push(project._id);
    await user?.save();
    return project;
}

export async function addUnregisteredUserToProject(data: any) {
    console.log('1 addUserToProject() data: ', data);
    const tempPassword = Math.floor(Math.random() * (100000000 - 999999999 + 1)) + 999999999;
    const project: ProjectObject = await ProjectModel.findById(data.projectId).then(project => project).catch(err => err);
    const user: UserObject = await UserModel.create({
        registered: false,
        pending: true,
        role: 'invited',
        plan: 'pending',
        tempPassword: tempPassword,
        email: data.email,
        projects: [data.projectId]
    });
    console.log('user: ', user);
    project?.users.push(user._id);
    await project?.save();
    console.log('$$$ final project', project);
    return project;
}

export async function addRegisteredUserToProject(data: any) {
    return;
}

export interface TrimmedUserObject {
    id: string,
    email: string,
    pending: boolean,
}

export interface TrimmedDiscussionObject {
    id: string,
    recentMessagePreview: string,
    thereIsRecentMessage: boolean
  }

export async function repopulateTeamMembers(projectId: string) {

    const project = await ProjectModel.findById(projectId).then(project => project).catch(err => err);
    const projectUsers = project.users;
    const adjustedUsers: TrimmedUserObject[] = [];

    if (!project) { return; }
    if (!projectUsers) { return; }
    const users = await Promise.all(project!.users.map(async (id: string) => {
        const user = await UserModel.findById(id).then(user => user);
        if (user) {
            const trimmedUserObject: TrimmedUserObject = { id: user._id, email: user.email, pending: user.pending };
            adjustedUsers.push(trimmedUserObject);
            return user;
        } else {
            return null;
        }
    }));
    return adjustedUsers;
}

export async function repopulateDiscussions(projectId: string) {
    console.log('2 attempting to repopulate discussions...');

    const project = await ProjectModel.findById(projectId).then(project => project).catch(err => err);
    const projectDiscussions = project.discussions;
    console.log('project: ', project);
    console.log('project discussions: ', projectDiscussions);
    const adjustedDiscussions: TrimmedDiscussionObject[] = [];

    if (!project) return;
    if (!projectDiscussions) return;
    const discussions = await Promise.all(project!.discussions.map(async (id: string) => {
        const discussion = await DiscussionModel.findById(id).then(discussion => discussion);
        if (discussion) {
            const trimmedDiscussionObject: TrimmedDiscussionObject = { id: discussion._id, recentMessagePreview: discussion.recentMessagePreview, thereIsRecentMessage: true }
            adjustedDiscussions.push(trimmedDiscussionObject);
            return discussion;
        } else {
            return null;
        }
    }));
    return adjustedDiscussions;
}

export async function removeFromTeam(userId: string, projectId: string) {
    console.log('removing user: ', userId);
    console.log('from project: ', projectId);
    try  {
        // --- project ------
        const user = await UserModel.findById(userId)
            .then(async user => {
                const userProjects = user?.projects;
                const userProjectsIndex: number = userProjects!.indexOf(projectId);
                if (userProjectsIndex !== -1) {
                    userProjects?.splice(userProjectsIndex, 1);
                }
                await user?.save();
                return user;
            });
        const project = await ProjectModel.findById(projectId)
            .then(async project => {
                const projectUsers = project?.users;
                const projectUsersIndex: number = projectUsers!.indexOf(userId);
                if (projectUsersIndex !== -1) {
                    projectUsers?.splice(projectUsersIndex, 0);
                }
                if (projectUsersIndex) projectUsers!.splice(projectUsersIndex, 1);
                await project?.save();
                return project?.users;
            });
        return project;
    } 
    catch (err) {
        console.log('error removing user from project...', err);
    }
}

export async function startADiscussion(data: any) {
    const discussion = await DiscussionModel.create({
        recipients: data.recipients,
        messages: [data.message],
        project: data.projectId
    });
    const project = await ProjectModel.findById(data.projectId)
        .then(project => {
            project?.discussions.push(discussion._id);
            return project?.discussions;
        })
        .catch(err => err);
    return project;
}

export async function joinProject(title: string, number: string, userId: string) {
    // need to find project by number, then validate by title
    const project = await ProjectModel.find({title: title}).then(project => project);
    console.log('project: ', project);
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

export async function addFilePathsToProjectAndUser(filePaths: any, userId: string, projectId: string) {
    console.log('filePaths: ', filePaths);
    // Projec
}