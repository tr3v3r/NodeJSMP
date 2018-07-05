import mongoose from 'mongoose';
import { dbName, url } from '../../constants';


export default function connect() {
  mongoose.connect(`${url}/${dbName}`);

  const db = mongoose.connection;
  db.on('error', () => console.log('Connection error'));
  db.once('open', () => {
    console.log('Connection to database success!');
  });
}

