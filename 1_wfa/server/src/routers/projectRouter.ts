import express from 'express';
import * as projectController from '../controllers/projectController';

export const app = express();

app.post('/createProject', async (req: any, res) => {
    const project = await projectController.createProject(req.body, req.user._id);
    return res.status(200).json(project);
})

app.get('/getProjectById', async (req: any, res) => {
    const project = await projectController.getProjectById(req.body)
    return res.status(200).json(project);
})