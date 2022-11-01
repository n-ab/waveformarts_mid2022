import express from 'express';
import * as projectController from '../controllers/projectController';

export const app = express();

app.post('/createProject', async (req: any, res) => {
    const project = await projectController.createProject(req.body, req.user._id);
    console.log('$$$ re re reee $$$');
    
    return res.status(200).json(project);
})

app.post('/joinProject', async (req: any, res) => {
    const newProjectUserList = await projectController.joinProject(req.body, req.user._id);
    console.log('new project users list: ', newProjectUserList);
    return res.status(200).json(newProjectUserList);
})

app.get('/getProjectById', async (req: any, res) => {
    const project = await projectController.getProjectById(req.body);
    return res.status(200).json(project);
})