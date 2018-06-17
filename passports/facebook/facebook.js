import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { usersData } from '../../models/';
import { ID, SECRET } from './constants';

export default function initFacebookPassport() {
  passport.use(new FacebookStrategy(
    {
      clientID: ID,
      clientSecret: SECRET,
      callbackURL: 'http://www.example.com/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile, done);
    //   const user = usersData.find(({ name }) => username === name);
    //   if (user === undefined) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   } else
    //   if (user.password !== password) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }

    //   return done(null, user);
    }
  ));
}

