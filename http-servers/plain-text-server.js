import http from 'http';
import { PORT } from './constants';

http
  .createServer()
  .on('error', (err) => {
    console.warn(`plain-text-server error:${err.message}`);
  })
  .on('request', (req, res) => {
    res.writeHead('200', {
      'Content-Type': 'text/plain'
    });
    res.end('Hello World');
  })
  .listen(PORT);

