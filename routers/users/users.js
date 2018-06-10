import express from 'express';

import { usersData } from '../../models/';

const users = express.Router();

users.get('/users/', (req, res) => {
  res.json(usersData);
});

export default users;

