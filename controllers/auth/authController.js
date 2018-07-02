import jwt from 'jsonwebtoken';
import { find } from 'lodash';
import { usersData } from '../../oldModels';
import { tokenExpiresIn } from './constants';

const authController = {
  authPost(req, res) {
    const user = find(usersData, { name: req.body.username });
    if (user === undefined || user.password !== req.body.password) {
      res.status(404).send({
        code: 404,
        message: 'Not found',
        data: { },
      });
    } else {
      const { id, isModerator, email, name } = user;
      const payload = { sub: id, isModerator };
      const token = jwt.sign(payload, 'secret', { expiresIn: tokenExpiresIn });
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
    if (!req.user) {
      res.json({ error: 'User is not found' });
    } else {
      res.json(req.user);
    }
  },

  facebookPassport(req, res) {
    if (!req.user) {
      res.json({ error: 'User is not found' });
    } else {
      res.json(req.user);
    }
  },

  twitterPassport(req, res) {
    if (!req.user) {
      res.json({ error: 'User is not found' });
    } else {
      res.json(req.user);
    }
  },

  googlePassport(req, res) {
    if (!req.user) {
      res.json({ error: 'User is not found' });
    } else {
      res.json(req.user);
    }
  }


};


export default authController;

