import express from 'express';
import * as fileController from '../controllers/fileController';
import multer from 'multer';

export const app = express();

// const storage = multer.diskStorage({
//     destination(req, file, callback) {
//         callback(null, "src/audio/waveformarts");
//     },
//     filename(req, file, callback) {
//         const name = req.body.title;
//         callback(null, name + '.wav');
//     },
// });

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log('multer.diskStorage config: req.body = ', req.body);
        console.log('multer.diskStorage config: file = ', file);
        callback(null, "src/audio/");
    },
    filename: (req, file, callback) => {
        if (req.body.project) {
            const name = `${req.body.project}-`+req.body.title;
            callback(null, name + '.wav');
        } else {
            const title = req.body.title;
            const name = 'noProj-'+title.replace(/\s+/g, '-').toLowerCase();
            console.log('name: ' + name + ' | versus title: ' + title);
            callback(null, file.originalname);
        }
    }
})

app.post('/uploadFile', multer({storage: storage}).single('audioFile'), async (req, res) => {
    console.log('req.body: ', req.body);
    fileController.uploadFile(req.body).then(file => res.status(200).json(file)).catch(err => res.status(500).json(false));
});