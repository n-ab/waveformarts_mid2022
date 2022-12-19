import express from 'express';
import * as adminController from '../controllers/adminController';
import * as tokenController from '../controllers/tokenController';

export const app = express();

app.post('/login', async (req: any, res) => {
    console.log(req.body);
    const admin = await adminController.login(req.body);
    if (admin !== false) {
        console.log('LOGIN SUCCESS. returning admin: ', admin);
        tokenController.addTokenToFreshAdmin(admin)
        return res.status(200).json(admin);
    } else {
        console.log('yo shit WRONG son');
        return res.status(200).json(false);
    }
    
});

app.get('/fetchAll', async (req: any, res) => {
    const admins = await adminController.fetchAll();
    return res.status(200).json(admins);
});

// app.post('/addAdmin', async (req: any, res) => {
//     const admin = await adminController.addAdmin(req.body);
//     console.log('admin saved as: ', admin);
//     return res.status(200).json(admin);
// })

app.get('/checkAdminToken/:id', (req: any, res) => {
    console.log('req.body: ', req.body);
    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);
    adminController.checkAdminToken(req.params['id']);
});

app.get('/compileAllMetrics', async (req: any, res) => {
    console.log('fetching metrics...');
    const metrics = await adminController.compileAllMetrics();
    return res.status(200).json(metrics);
});

app.post('/addPage', async (req: any, res) => {
    const page = await adminController.addPage(req.body);
    return res.status(200).json(page);
})

app.post('/addUser', async (req: any, res) => {
    const user = await adminController.addUser(req.body);
    console.log('/addUser - user = ', user);
    return res.status(200).json(user);
})