import jwt from 'jsonwebtoken';
import { find } from 'lodash';
import { usersData } from '../../modelss';


const authController = {
  authPost(req, res) {
    const user = find(usersData, { name: req.body.username });
    if (user === undefined || user.password !== req.body.password) {
      res.status(403).send({
        code: 403,
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
  },

  localPassport(req, res) {
    res.json(req.user);
  },

  facebookPassport(req, res) {
    res.json(req.user);
  },

  twitterPassport(req, res) {
    res.json(req.user);
  },

  googlePassport(req, res) {
    res.json(req.user);
  }
};


export default authController;

