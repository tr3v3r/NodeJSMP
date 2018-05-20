import through2 from 'through2';
import fs from 'fs';
import csvjson from 'csvjson';
import CustomArgsParser from './customArgsParser';
import ConcatStreams from './ConcatStreams';

const myParser = new CustomArgsParser();

const actions = {
  reverse,
  transform,
  outputFile,
  convertFromFile,
  convertToFile,
  cssBundler
};

myParser
  .register('--action, -a [name]', 'action', 'Invoke an action with given [name]')
  .addChild('--file, -f [argument]', 'Pass an [argument] for given action')
  .addChild('--path, -p [path]', 'Pass an [path] for given action')
  .on('action', onActionHandler)
  .parse(process.argv.slice(2));

function onActionHandler(actionName, ...args) {
  const action = actions[actionName];
  if (action) action(...args);
  else throw new Error(`There is no action with given name ${actionName}`);
}

function reverse() {
  process.stdin
    .on('error', error => console.warn(error.message))
    .pipe(through2(function (buffer, enc, next) {
      const input = buffer.toString().trim();
      const output = input.split('').reverse().join('');
      this.push(`${output}\n`);
      next();
    }))
    .pipe(process.stdout);
}

function transform() {
  process.stdin
    .on('error', error => console.warn(error.message))
    .pipe(through2(function (buffer, enc, next) {
      const input = buffer.toString().trim();
      const output = input.toUpperCase();
      this.push(`${output}\n`);
      next();
    }))
    .pipe(process.stdout);
}

function outputFile(path) {
  const stream = fs.createReadStream(path)
    .on('error', error => console.warn(error.message))
    .pipe(process.stdout);
}

function convertFromFile(path) {
  fs.createReadStream(path)
    .on('error', error => console.warn(error.message))
    .pipe(through2(function (chunk, enc, next) {
      const input = chunk.toString().trim();
      const output = csvjson.toObject(input);
      this.push(`${JSON.stringify(output)}\n`);
      next();
    }))
    .pipe(process.stdout);
}

function convertToFile(path) {
  const input = fs.createReadStream(path);
  const output = fs.createWriteStream('test.json');
  input
    .on('error', error => console.warn(error.message))
    .pipe(through2(function (chunk, enc, next) {
      const inputData = chunk.toString().trim();
      const outputData = csvjson.toObject(inputData);
      this.push(`${JSON.stringify(outputData)}\n`);
      next();
    }))
    .pipe(output);
}

function cssBundler(path) {
  const concatStream = new ConcatStreams();
  const files = fs.readdirSync(path);
  const result = fs.createWriteStream(`${path}/bundle.css`);

  files.forEach((file) => {
    concatStream.append(fs.createReadStream(`${path}/${file}`));
  });

  concatStream
    .on('error', error => console.warn(error.message))
    .pipe(result);
}

