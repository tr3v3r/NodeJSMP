import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { usersData } from '../../models/';
import { ID, SECRET } from './constants';

const test = {};
export default function initFacebookPassport() {
  passport.use(new FacebookStrategy(
    {
      clientID: ID,
      clientSecret: SECRET,
      callbackURL: 'http://localhost:8080/api/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      const registeredUser = usersData.find(({ name }) => name === profile.displayName);
      if (!registeredUser) {
        return done(null, false, 'User with given data is not registered');
      }
      return done(null, profile);
    }
  ));
}

