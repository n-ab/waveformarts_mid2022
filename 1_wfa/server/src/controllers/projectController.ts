import { ProjectModel } from '../models/project';
import { UserModel } from '../models/user';

// NEW PROJECT PATH WITH NO KNOWN USER
export async function createNewProject(data: any, filePaths: string[]) {
    const project = await ProjectModel.create({ title: data.title, companyProject: data.companyProject, description: data.description, email: data.email, projectLead: data.email, filePaths: filePaths });
    const user =    await UserModel.create({    email: data.email, status: true, role: 'lead', nameAbbreviation: data.companyProject, company: data.companyProject, projects: project._id });
    project.users.push(user._id);
    await project.save();
    await user.save();
    return project._id;    
}

export async function getProjectById(data: any) {
    console.log('getProjectById() - id: ', data);
    const project = await ProjectModel.findById(data).then(project => project);
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