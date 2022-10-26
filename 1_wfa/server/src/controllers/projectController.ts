import mongoose from 'mongoose';
import { ProjectModel } from '../models/project';

export async function createProject(data, userId) {
    const project = await ProjectModel.create({title: data.title, projectLead: userId, users: [userId]}).then(project => project);
    console.log('project: ', project);
    return project;
}

export async function getProjectById(data) {
    const project = await ProjectModel.findById(data.projectId).then(project => project);
    return project;
}

export async function addUserToProject(data) {
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