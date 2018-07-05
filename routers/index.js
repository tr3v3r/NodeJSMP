import express from 'express';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import passport from 'passport';


import { productsController, userContoller, authController, citiesController } from '../controllers';
import { queryParser, cookieParser, verify } from '../middlewares';
import { initLocalPassport, initFacebookPassport, initTwitterPassport, initGooglePassport } from '../passports';

const router = express.Router();

router.use(express.json());
router.use(queryParser);
router.use(cookieParser);
router.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
// router.use('/api/', verify);

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
router.delete('/api/products/:id', productsController.productsDelete);
router.get('/api/products/:id/reviews', productsController.reviews);

router.get('/api/users', userContoller.getUsers);
router.delete('/api/users/:id', userContoller.deleteUser);

router.get('/api/cities', citiesController.getCities);
router.post('/api/cities', citiesController.postCities);
router.put('/api/cities/:id', citiesController.putCity);
router.delete('/api/cities/:id', citiesController.removeCity);
router.get('/api/city', citiesController.getRandomCity);


export default router;
