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

app.post('/submitProject', upload.array('files'), async (req: any, res) => {
    console.log('/startProject - req.body', req.body);
    if (req.body.hasOwnProperty('files')) {
        console.log('handling NEW PROJECT + FILES');
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
            return res.status(500).json('reeee');
        }
        const projectId = await projectController.createNewProject(req.body, filePaths);
        return res.status(200).json(projectId);
    } else {
        console.log('handling NEW PROJECT - no files');
        const projectId = await projectController.createNewProject(req.body, []);
        return res.status(200).json(projectId);
    }
})

app.get('/getProjectData/:id', async (req: any, res) => {
    if (req.params.id.length <= 0 || req.params.id == 'undefined') return res.status(500).json('A project id was not sent from client-side.');
    const project = await projectController.getProjectById(req.params.id);
    if (project) return res.status(200).json(project);
    return res.status(500).json('REEEEE');
    
})

app.post('/contact', async (req: any, res) => {
    const contactInfo = await projectController.contact(req.body);
    return res.status(200).json(contactInfo);
})