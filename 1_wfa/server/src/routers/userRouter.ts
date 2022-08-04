import express from 'express';
import * as userController from '../controllers/userController';
import { login, logout } from '../auth/auth';

export const app = express();

// --- S E S S I O N      F U N C T I O N S ------------------------------

app.get('/check', (req: any, res) => {
    if (!req.user) return res.status(200).json(false);
    return res.status(200).json(req.user);
})

app.post('/login', login, (req: any, res) => {
    console.log('LOGGING IN', req.body);
})

app.post('/logout', logout, (req: any, res) => {
    console.log('LOGGING OUT', req.body);
})