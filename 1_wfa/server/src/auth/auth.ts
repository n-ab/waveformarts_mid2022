import { Passport } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/user';
import express from 'express';
import * as bcrypt from 'bcryptjs';

const passport = new Passport();
const app = express();

export function login(req: any, res: any, next: any) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) { return res.status(401).json({message: 'Invalid credentials'}); }
        req.login(user, (err: any) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ message: 'Login successful', user: user._id });
        });
    })(req, res, next);
}

export function logout(req: any, res: any) {
    if(!req.user) return res.json({success: false});
    req.logout();
    req.session.destroy();
    console.log('LOGOUT SUCCESS');
    return res.json({success: true});
}

passport.serializeUser((user: any, done) => {
    if(!user._id) done({error: 'No user id.'}, null);
    done(null,user._id);
  });
  
passport.deserializeUser((id, done) => {
    UserModel.findById(id).select('firstName ')
        .lean()
        .exec()
        .then(user => {
        if(!user) return done('No user found.', null);
            done(null, user);
        });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        UserModel.findOne({username: username}, function(err: any, user: any) {
            if (err)                        { return done(err) }
            if (!user)                      { return done(null, false, { message: '2 No trace of that user exists.' }); }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) { return done(err); }
                if (isMatch) { 
                    return done(null, user); 
                } else {
                    return done(null, false);
                }
            });
        })
        .catch(err => err)
    }
));