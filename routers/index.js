import express from 'express';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import passport from 'passport';


import { productsController, users, authController } from '../controllers';
import { queryParser, cookieParser, verify } from '../middlewares';
import { initLocalPassport, initFacebookPassport, initTwitterPassport, initGooglePassport } from '../passports';

const router = express.Router();

router.use(express.json());
router.use(queryParser);
router.use(cookieParser);
router.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use('/api/', verify);

initLocalPassport();
initFacebookPassport();
initTwitterPassport();
initGooglePassport();

router.post('/auth', authController.authPost);
router.post('/auth/local', passport.authenticate('local', { session: false }), authController.localPassport);

router.get('/auth/facebook', passport.authenticate('facebook', { session: false }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), authController.facebookPassport);

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter'), authController.twitterPassport);

router.get('/auth/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));
router.get('/auth/google/callback', passport.authenticate('google'), authController.googlePassport);


router.post('/api/products', productsController.productsPost);
router.get('/api/products', productsController.productsGet);
router.get('/api/products/:id', productsController.id);
router.get('/api/products/:id/reviews', productsController.reviews);
router.get('/api/users', users);


export default router;
