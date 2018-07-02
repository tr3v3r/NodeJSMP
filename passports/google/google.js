import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { usersData } from '../../models/';
import { ID, SECRET } from './constants';

const test = {};
export default function initGooglePassport() {
  passport.use(new GoogleStrategy(
    {
      clientID: ID,
      clientSecret: SECRET,
      callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) =>
    //   const registeredUser = usersData.find(({ name }) => name === profile.displayName);
    //   if (!registeredUser) {
    //     return done(null, false, 'User with given data is not registered');
    //   }
      done(null, profile)

  ));
}

