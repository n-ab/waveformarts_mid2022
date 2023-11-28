import express from 'express';
import * as projectController from '../controllers/projectController';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

export const app = express();

type CustomFile = Express.Multer.File & { fieldname?: string, originalname?: string, encoding?: string, mimetype?: string, destination?: string, filename?: string, path?: string, size?: number, }

const storage = multer.diskStorage({ filename: (req: any, file, cb) => { cb(null, file.originalname); } })
const upload = multer({ storage });

app.post('/startProject', async (req: any, res) => {
    if (req.user) {
        const project = await projectController.startProject(req.body.projectData, req.user._id);
        return res.status(200).json(project);
    }
})

app.post('/startProjectWithNoFiles', async (req: any, res) => {
    console.log('starting project with data: ', req.body);
    if (!req.user) {
        const projectCreationConfirmation = await projectController.createNewProject(req.body, [], '');
        return res.status(200).json(projectCreationConfirmation);
    } else {
        const projectCreationConfirmation = await projectController.createNewProject(req.body, [], req.user._id);
        return res.status(200).json(projectCreationConfirmation);
    }
})

app.post('/submitProject', upload.array('files'), async (req: any, res) => {
    if (req.body.hasOwnProperty('files')) {
        fs.mkdir(`./audioFiles/${req.body.companyProject}`, {recursive: true}, (err) => { if (err) return res.status(500).json(err); });
        const files = req.files as CustomFile[];
        const filePaths: string[] = [];
        const renameAsync = promisify(fs.rename);
        try {
            await Promise.all(files?.map(async (file) => {
                const destinationPath = path.join('./audioFiles', req.body.companyProject, file.originalname);            
                await renameAsync(file.path, destinationPath);
                filePaths.push(destinationPath);
            }));
        } catch (error) {
            console.error('failed to move file to project directory: ', error);
            return res.status(500).json(error);
        }
    } else {
        const projectId = await projectController.createNewProject(req.body, [], req.user._id);
        return res.status(200).json(projectId);
    }
})

app.post('/contact', async (req: any, res) => {
    const contactInfo = await projectController.contact(req.body);
    return res.status(200).json(contactInfo);
})

app.get('/fetchProjects', async (req: any, res) => {
    const projects = await projectController.fetchProjects(req.user._id);
    return res.status(200).json(projects);
});

app.get('/fetchProjectsByUserId', async (req: any, res) => {
    const projects = await projectController.fetchProjects(req.user._id);
    projects.forEach(project => {console.log('project', project.title)});
    return res.status(200).json(projects);
});

app.get('/getProjectData/:id', async (req: any, res) => {
    // console.log('+ Object.values(req.params)', Object.values(req.params)[0]);
    if (Object.values(req.params)[0] !== undefined) {
        const project = await projectController.fetchSingleProjectData(req.params.id)
            .catch(err => { console.log('error in getProjectData/:id', err); return err; });
        return res.status(200).json(project);
    } else {
        console.log('------ something is undefined. returning 401.');
        return res.status(401).json('Server restarted. Please log in again.');
    }
});

app.post('/loginToProject', async (req: any, res) => {
    console.log('logging into project...', req.body);
    const project = await projectController.joinProject(req.body.title, req.body.number, req.user._id);
    return res.status(200).json(project);
})

app.post('/addUserToProject', async (req: any, res) => {
    if (req.body.wfaUserId == '') {
        const updatedProject = await projectController.addUnregisteredUserToProject(req.body);
        console.log('updatedProject', updatedProject);
        return res.status(200).json(updatedProject);
    } else {
        const updatedProject = await projectController.addRegisteredUserToProject(req.body);
        console.log('updatedProject', updatedProject);
        return res.status(200).json(updatedProject);
    }
});

app.post('/removeFromTeam', async (req: any, res) => {
    const updatedUserList = await projectController.removeFromTeam(req.body.userId, req.body.projectId);
    console.log('updatedUserList: ', updatedUserList);
    return res.status(200).json(updatedUserList);
});

app.get('/repopulateTeamMembers/:id', async (req: any, res) => {
    const updatedTeamMemberList = await projectController.repopulateTeamMembers(req.params.id);
    console.log('repopulated team members: ', updatedTeamMemberList);
    return res.status(200).json(updatedTeamMemberList);
});

app.get('/repopulateDiscussions/:id', async (req: any, res) => {
    console.log('1 attempting to repopulate discussions...', req.body + ' | ' + req.params);
    const updatedDiscussions = await projectController.repopulateDiscussions(req.params.id);
    console.log('updated DISCUSSION list: ', updatedDiscussions);
    return res.status(200).json(updatedDiscussions);
});

app.post('/startADiscussion', async (req: any, res) => {
    const updatedDiscussionList = await projectController.startADiscussion(req.body);
    return res.status(200).json(updatedDiscussionList);
});

app.post('/uploadFilesToProject', async (req: any, res) => {
    console.log(req.body);
    console.log(req.files);
    console.log(req.query);
    console.log(req.params);

    // const updatedFileList = await projectController.addFilePathsToProjectAndUser(req.files);
    // return res.status(200).json(updatedFileList);
})