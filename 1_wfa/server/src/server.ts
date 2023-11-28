import express from 'express';
import session from 'express-session';
import { config } from '../config';
import 'dotenv/config';
import mongoose from 'mongoose';
import passport from 'passport';
import { UserModel } from '../src/models/user';

console.log('Welcome to Waveform Arts, running on port ' + config.PORT);

//--- e x p r e s s     ------------------------------------------

const app = express();

// app.use(bodyParser.json({limit: '32MB'}));
// app.use(bodyParser.urlencoded({limit: '32MB', extended: false}));
// app.use('/audioFiles')

app.use(express.json({limit:'32MB'}));
app.use(express.urlencoded({limit:'32MB', extended:false}));
app.use("/audiofiles", express.static(`./audiofiles`));

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
app.use('/api', router);