import express from 'express';
import session from 'express-session';
import { config as dotenvConfig } from 'dotenv';
import { config } from '../config';
import mongoose from 'mongoose';
import passport from 'passport';
import { UserModel } from '../src/models/user';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import cors from 'cors'

console.log('Welcome to Waveform Arts, running on port ' + config.PORT);

//--- e x p r e s s     ------------------------------------------

const app = express();

// app.use(bodyParser.json({limit: '32MB'}));
// app.use(bodyParser.urlencoded({limit: '32MB', extended: false}));
// app.use('/audioFiles')
app.use(cors());
app.use(express.json({limit:'32MB'}));
app.use(express.urlencoded({limit:'32MB', extended:false}));
app.use("/audioFiles", (req, res, next) => {
    const filePath = __dirname + '/..' + '/audioFiles' + `${req.url}`;
    const normalizedFilePath = path.normalize(filePath);
    // const file = fs.readFile(normalizedFilePath, (err, data) => {
    //     if (err) console.log('error reading file: ', err);
    //     if (data) console.log('file data: ', data);
    // });
    // const normalizedFilePath2 = normalizedFilePath.split("/").slice(0, -1).join("/");
    // const directory = fs.readdir(normalizedFilePath2, (err, files) => {
    //     if (err) console.log('error reading file: ', err);
    //     if (files) console.log('files: ', files);
    // });
    const stat = fs.statSync(normalizedFilePath);
    console.log('fs.statSync(normalizedFilePath): ', stat);
    
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {        
        const parts = range.replace(/bytes=/, '').split('-');
        console.log('parts: ', parts);
        
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'audio/wav',
        };
    
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        console.log('aint no range.');
        
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'audio/wav',
        };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
      }
}, express.static('../audioFiles'));
// app.use("/audioFiles", (req, res, next) => {
//     console.log('normalized filePath: ', normalizedFilePath);
//     const file = await fs.readFile(normalizedFilePath, (err, data) => {
//         if (err) console.log('error: ', err);
//         return file;
//     });
//     // fs.readdir(normalizedFilePath, (err, files) => {
//     //     if (err) { console.log('error: ', err); return err; } 
//     //     else { console.log('directory contents: ', files); }        
//     // })
//     next();
// }, express.static('../audioFiles'));

app.use((req: any, res: any, next: any) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    next();
});
app.listen(config.PORT);

app.use(session({
    name:'waveformArtsSession',
    secret: 'suckadickdumbshit!',
    saveUninitialized: false,
    resave: false
}));

//--- p a s s p o r t ------------------------------------------

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
    if(!user._id) done({error: 'No user id.'}, null);
    done(null,user._id);
  });
  
passport.deserializeUser((id, done) => {
    UserModel.findById(id).select('_id firstName projects')
        .lean()
        .exec()
        .then(user => {
        if(!user) return done('No user found.', null);
            done(null, user);
        });
});

// --- m o n g o o s e ----------------------------------------

mongoose.set('strictQuery', false);
mongoose.connect(config.database)
    .then(() => {
        console.log(`and using database: ${config.database}`);
        console.log('- - - - - - - - - - - - - - - - - - - - - - - - -');
    }).catch(err => {
        console.log('Database not active. Run: sudo mongod');
        return err;
})

// --- r o u t i n g ------------------------------------------

import { router } from '../src/routers/routers';
import { fetchSingleProjectData } from './controllers/projectController';
app.use('/api', router);

// --- n o d e m a i l e r ------------------------------------

dotenvConfig();

const mailer = nodemailer.createTransport({
    host: 'smpt.protonmail.com',
    port: 587,
    secure: false,
    auth: {
        user: config.email.username,
        pass: config.email.password
    }
})