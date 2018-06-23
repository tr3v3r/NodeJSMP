import http from 'http';
import fs from 'fs';
import through2 from 'through2';

import { PORT } from './constants';

http
  .createServer()
  .on('error', (err) => {
    console.warn(`HTML-server error: ${err.message}`);
  })
  .on('request', (req, res) => {
    const { method, url } = req;
    if (method === 'GET') throw new Error(`Method ${method} id not allowed, use "GET"`);
    // 1.
    // let htmlText = fs.readFileSync('index.html', { encoding: 'utf8' });
    // htmlText = htmlText.replace('{message}', 'Real Message Text');
    // res.writeHead('200', {
    //   'Content-Type': 'text/html'
    // });

    //  res.on('error', (err) => {
    //    console.warn(err);
    //  });

    // res.end(htmlText);

    // 2.
    const stream = fs.createReadStream('index.html');

    stream.on('data', (chunk) => {
      const htmlText = chunk.toString().trim();
      const output = htmlText.replace('{message}', 'Real Message Text');
      res.write(output);
    });

    stream.on('end', () => {
      res.end();
    });

    stream.on('error', (err) => {
      console.warn(err);
    });


    // 3.
    //   fs.createReadStream('index.html')
    //    .on('error', (err) => {
    //      console.warn(err);
    //     });
    //     .pipe(through2(function (buffer, enc, next) {
    //       const htmlText = buffer.toString().trim();
    //       const output = htmlText.replace('{message}', 'Real Message Text');
    //       this.push(output);
    //       next();
    //     }))
    //     .pipe(res);
  })
  .listen(PORT);

