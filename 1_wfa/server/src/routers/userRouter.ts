import express from 'express';
import * as userController from '../controllers/userController';
import { login, logout } from '../auth/auth';

export const app = express();

// --- S E S S I O N      F U N C T I O N S ------------------------------

app.get('/check', (req: any, res) => {    
    if (!req.user) {
        console.log('no login.');
        return res.status(200).json(false);
    }
    console.log('active session for: ', req.user.firstName);
    
    return res.status(200).json(req.user);
})

app.post('/login', login, (req: any, res) => {
    console.log('LOGGING IN', req.body);
})

app.post('/logout', logout, (req: any, res) => {
    console.log('LOGGING OUT', req.body);
})

app.post('/register', async (req: any, res) => {
    console.log('registering:', req.body);
    const user = await userController.register(req.body);
    return res.status(200).json();
})

app.get('/fetchFiles', async (req: any, res) => {
    if (req.user) {
        const files = await userController.fetchFiles(req.user);
        console.log('returning files: ', files);
        
        return res.status(200).json({downloads: files?.downloads, uploads: files?.uploads});
    } else {
        return res.status(200).json('no one logged in.')
    }
})