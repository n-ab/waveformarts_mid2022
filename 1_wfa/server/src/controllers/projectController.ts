import mongoose from 'mongoose';
import { ProjectModel } from '../models/project';
import { UserModel } from '../models/user';

export async function createProject(data: any, userId: string) {
    const project = await ProjectModel.create({title: data.title, projectLead: userId, users: [userId], files: [], discussions: [], messages: []}).then(project => project);
    console.log('project: ', project);
    const user = await UserModel.findById(userId);
    await user?.projects.push(project._id);
    await user?.save();
    return project;
}

export async function getProjectById(data: any) {
    const project = await ProjectModel.findById(data.projectId).then(project => project);
    return project;
}

export async function addUserToProject(data: any) {
    const project = await ProjectModel.findById(data.projectId).then(project => project);
    project?.users.push(data.userId);
    await project?.save();
    return project?.users;
}

export async function addDiscussionToProject(data: any) {
    console.log('1');
    const project = await ProjectModel.findById(data.projectId).then(project => project);
    console.log('2');
    project?.discussions.push(data.discussionId);
    console.log('3');
    await project?.save();
    console.log('4');
    return project?.discussions;
}