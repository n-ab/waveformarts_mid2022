import express, { Request, Response } from 'express';
import * as fileController from '../controllers/fileController';
import * as projectController from '../controllers/projectController';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const app = express();

type CustomFile = Express.Multer.File & { fieldname?: string, originalname?: string, encoding?: string, mimetype?: string, destination?: string, filename?: string, path?: string, size?: number, }

// const upload = multer({fileFilter()});

// STEP 1

// you should add body-parser shit here.
// leave actual file upload to step 2. 

app.post('/prepareDestinationFolder', (req: any, res) => {
    console.log('prepareDestinationFolder - req.body', req.body);
    const baseDirectory = `./audioFiles/${req.body.destinationFolder}`;
    fs.mkdir(baseDirectory, { recursive: true },(err) => {
        if (err) return res.status(200).json(err);
        return res.status(200).json(baseDirectory);
    });
});

// STEP 2

// 2a
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // the issue is here dude. for real. look no further. 
        // look at line 56. file.destination is set here. 
        // 'file' is literally set here, as well as file.filename below
        const companyProject = req.body.companyProject;
        const destinationFolder = `./audioFiles/${companyProject}`;
        fs.mkdir(destinationFolder, { recursive: true }, (err) => {
            if (err) { cb(err, '') }
            else { cb(null, destinationFolder) }
        })
    },
    filename: (req: any, file, cb) => {
        cb(null, file.originalname);
    }
});

// 2b
const upload = multer({ storage });

app.post('/uploadFile', upload.array('files'), async (req, res) => {
    console.log('=======================')
    console.log('uploadFile - req.body = ', req.body);
    const files = req.files as CustomFile[];
    const uploadPromises = files?.map((file) => {
        const destinationPath = path.join('./audioFiles', req.body.companyProject, file.originalname);
        return new Promise<void>((resolve, reject) => {
            fs.rename(file.path, destinationPath, (err) => {
                if (err) { console.error('Failed to move file to project directory', err); reject(err); }
                else { resolve(); }
            })
        })
    });
    Promise.all(uploadPromises)
        .then(() => {
            fileController.uploadFile(req.body);
            res.status(200).json({ message: 'Files uploaded successfully.'});
        })
        .catch(err => {
            console.error('could not upload files because: ', err);
            return res.status(500).json({error: 'Failed to upload files ya BISH'});
        })
    // fileController.uploadFile(req.body).then(file => res.status(200).json(file)).catch(err => res.status(500).json(false));
});

app.get('/fetchProjectFiles/:id', async (req: any, res) => {
    const files = await fileController.fetchProjectFiles(req.params.id);
    return res.status(200).json(files);
})