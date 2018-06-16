import express from 'express';
import jwt from 'jsonwebtoken';
import { usersData } from '../../models/';

const auth = express.Router();

auth.use(express.json());

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

