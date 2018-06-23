import http from 'http';
import { PORT } from './constants';

http
  .createServer()
  .on('error', (err) => {
    console.warn(`Echo-server error:${err.message}`);
  })
  .on('request', (req, res) => {
    req.pipe(res);
  })
  .listen(PORT);
