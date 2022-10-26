import express from 'express';
import * as userController from '../controllers/userController';
import { login, logout } from '../auth/auth';
import multer from 'multer';

export const app = express();

// --- M U L T E R ----------

const storageQuestion = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "src/images/questions");
    },
    filename: (req, file, callback) => {
        console.log('req.body', req.body);
        console.log('file', file);
        callback(null, 'reee');
    }
})

const storageReport = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "src/images/questions");
    },
    filename: (req, file, callback) => {
        console.log('req.body', req.body);
        console.log('file', file);
        callback(null, 'reee');
    }
})

// --- S E S S I O N      F U N C T I O N S ------------------------------

app.get('/check', (req: any, res) => {    
    if (!req.user) {
        console.log('no login.');
        return res.status(200).json(false);
    }
    console.log('LOGGED IN: ', req.user.firstName);
    
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

app.post('/changePassword', async (req: any, res) => {
    const result = await userController.changePassword(req.body, req.user['_id']);
    console.log('user saved as: ', result);
    
    return res.status(200).json(result);
})

app.post('/changeEmail', async (req: any, res) => {
    const result = await userController.changeEmail(req.body, req.user['_id']);
    console.log('user saved as: ', result);
    
    return res.status(200).json(result);
})

app.get('/fetchPlan', async (req: any, res) => {
    const plan = await userController.fetchPlan(req.user._id);
    console.log('users plan = ', plan);
    return res.status(200).json(plan);
})

app.post('/askQuestion', multer({storage: storageQuestion}).single('image'), async (req: any, res) => {
    const question = await userController.addQuestion(req.user, req.body);
    console.log('question asked: ', question);
    return res.status(200).json(question);
})

app.post('/reportIssue', multer({storage: storageReport}).single('image'), async (req: any, res) => {
    const issue = await userController.reportIssue(req.user, req.body);
    console.log('issue reported: ', issue);
    return res.status(200).json(issue);
})

app.post('/makeSuggestion', async (req: any, res) => {
    const suggestion = await userController.makeSuggestion(req.user, req.body);
    console.log('suggestion saved: ', suggestion);
    return res.status(200).json(suggestion);
})