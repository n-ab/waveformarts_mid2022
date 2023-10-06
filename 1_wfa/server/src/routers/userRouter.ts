import express from 'express';
import * as userController from '../controllers/userController';
import { login, logout } from '../auth/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

export const app = express();

type CustomFile = Express.Multer.File & { fieldname?: string, originalname?: string, encoding?: string, mimetype?: string, destination?: string, filename?: string, path?: string, size?: number, }

// --- M U L T E R ----------

// const storageQuestion = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "src/images/questions");
//     },
//     filename: (req, file, callback) => {
//         console.log('req.body', req.body);
//         console.log('file', file);
//         callback(null, 'reee');
//     }
// })

// const storageReport = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "src/images/questions");
//     },
//     filename: (req, file, callback) => {
//         console.log('req.body', req.body);
//         console.log('file', file);
//         callback(null, 'reee');
//     }
// })

const storage = multer.diskStorage({ filename: (req: any, file, cb) => { cb(null, file.originalname); } })
const upload = multer({ storage });

// --- S E S S I O N      F U N C T I O N S ------------------------------

app.get('/check', (req: any, res) => {    
    if (!req.user) {
        console.log('no login.');
        return res.status(200).json(false);
    }
    console.log('LOGGED IN: ', req.user);
    
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
    return res.status(200).json(user.email);
})

app.post('/addFileToUser', upload.array('files'), async (req: any, res) => {
    fs.mkdir(`./audioFiles/${req.user._id}`, {recursive: true}, (err) => { if (err) return res.status(500).json(err); });
    const files = req.files as CustomFile[];
    const filePaths: string[] = [];
    const renameAsync = promisify(fs.rename);
    try {
        await Promise.all(files?.map(async (file) => {
            const destinationPath = path.join('./audioFiles', req.body.companyProject, file.originalname);            
            await renameAsync(file.path, destinationPath);
            filePaths.push(destinationPath);
        }))
    } catch (error) {
        console.error('failed to move file to project directory: ', error);
        return res.status(500).json('reeee');
    }
    return res.status(200).json(filePaths);
})

app.get('/fetchFiles', async (req: any, res) => {
    if (req.user) {
        const files = await userController.fetchFiles(req.user);
        console.log('returning files: ', files);
        
        return res.status(200).json({downloads: files?.downloads, uploads: files?.uploads});
    } else {
        return res.status(200).json('no one logged in.');
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

app.get('/fetchEmailCompanyProject', async (req: any, res) => {
    
})

app.get('/fetchMessages', async (req: any, res) => {
    const messages = await userController.fetchMessages(req.user._id);
    return res.status(200).json(messages);
})

app.post('/submitMessage', async (req: any, res) => {
    // if there's an associated discussion...
    const message = await userController.addMessageToDiscussion(req.body.content, req.body.discussionId, req.user._id);
})

app.get('/fetchPopulatedUserData', async (req: any, res) => {
    const user = await userController.fetchPopulatedUserData(req.user._id);
    return res.status(200).json(user);
})