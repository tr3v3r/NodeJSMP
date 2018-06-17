import passport from 'passport';
import LocalStrategy from 'passport-local';
import { usersData } from '../../models/';


export default function initLocalPassport() {
  passport.use(new LocalStrategy((username, password, done) => {
    const user = usersData.find(({ name }) => username === name);
    if (user === undefined) {
      return done(null, false, { message: 'Incorrect username.' });
    } else
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  }));
}

