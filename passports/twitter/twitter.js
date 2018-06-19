import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import { usersData } from '../../models/';
import { ID, SECRET } from './constants';

const test = {};
export default function initTwitterPassport() {
  passport.use(new TwitterStrategy(
    {
      consumerKey: ID,
      consumerSecret: SECRET,
      callbackURL: 'http://localhost:8080/api/auth/twitter/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      const registeredUser = usersData.find(({ name }) => name === profile.name);
      if (!registeredUser) {
        return done(null, false, 'User with given data is not registered');
      }
      return done(null, profile);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
