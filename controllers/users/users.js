import { usersData } from '../../models/';

export default function (req, res) {
  res.json(usersData);
}

