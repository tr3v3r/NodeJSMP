import express from 'express';
import session from 'express-session';
import jwt from 'jsonwebtoken';

import passport from 'passport';
import { initLocalPassport, initFacebookPassport, initTwitterPassport, initGooglePassport } from '../../passports';

import { usersData } from '../../models/';

const auth = express.Router();
auth.use(express.json());
auth.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }));
auth.use(passport.initialize());
auth.use(passport.session());

// initLocalPassport();
// auth.post('/auth', passport.authenticate('local', { session: false }), (req, res) => {
//   res.json(req.user);
// });

/* facebook */

initFacebookPassport();

auth.get('/auth/facebook', passport.authenticate('facebook', { session: false }));
auth.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
  res.json(req.user);
});

/* twitter */
initTwitterPassport();

auth.get('/auth/twitter', passport.authenticate('twitter'));
auth.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
  res.json(req.user);
});

/* google */
initGooglePassport();

auth.get('/auth/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));
auth.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.json(req.user);
});


auth.post('/auth', (req, res) => {
  const user = usersData.find(({ name }) => req.body.userName === name);
  if (user === undefined || user.password !== req.body.password) {
    res.status(403).send({
      code: 404,
      message: 'Not found',
      data: { },
    });
  } else {
    const { id, isModerator, email, name } = user;
    const payload = { sub: id, isModerator };
    const token = jwt.sign(payload, 'secret', { expiresIn: 100 });
    const response = {
      code: 200,
      message: 'OK',
      data: {
        user: {
          email,
          name
        }
      },
      token
    };
    res.send(response);
  }
});

export default auth;

