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
    const baseDirectory = `./audioFiles/${req.body.title}/${req.body.fileType}`;
    fs.mkdir(baseDirectory, { recursive: true },(err) => {
        if (err) return res.status(200).json(err);
        return res.status(200).json(baseDirectory);
    });
});

// STEP 2

// 2a

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('req.body - ', req.body);
        console.log('file - ', file);
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

app.post('/uploadFileAndStartNewProject', upload.array('files'), (req: any, res) => {
    return;
})

app.post('/uploadFile', upload.array('files'), (req, res) => {
    const files = req.files as CustomFile[];
    const uploadPromises = files?.map((file) => {
        const destinationPath = path.join('./audioFiles', req.body.companyProject, req.body.fileType, file.originalname);
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
    const files = await fileController.fetchProjectFilepaths(req.params.id);
    return res.status(200).json(files);
});

app.get('/fetchFullFiles/:id', async (req: any, res) => {
    const files = await fileController.fetchFullFiles(req.params.id);
    setTimeout(() => {
        return res.status(200).json(files);
    }, 2000);
    
})

app.post('/removeFile', async (req: any, res) => {
    const files = await fileController.removeFile(req.body);
    return res.status(200).json(files);
})