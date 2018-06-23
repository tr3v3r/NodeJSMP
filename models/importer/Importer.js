import fs from 'fs';
import EventEmitter from 'events';
import csvjson from 'csvjson';

export default class Importer {
  constructor(watcher) {
    if (!(watcher instanceof EventEmitter)) {
      throw new Error('Watcher should be an EventEmitter class instance!');
    }
    this.watcher = watcher;
  }

  onChangeImportSync() {
    this.watcher.on('changed', (path) => {
      const csvData = this.importSync(path);
      const jsonData = csvjson.toObject(csvData);
      console.log(`file at path ${path} was updated:`);
      console.log(csvData);
    });
  }

  onChangeImportAsync() {
    this.watcher.on('changed', (path) => {
      this.import(path)
        .then(csvData => csvjson.toObject(csvData))
        .then((json) => {
          console.log(`file at path ${path} was updated:`);
          console.log(json);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  }

  import(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: 'utf8' }, (error, data) => {
        if (error) reject(error);
        resolve(data);
      });
    });
  }

  importSync(path) {
    const csv = fs.readFileSync(path, { encoding: 'utf8' });
    return csv;
  }
}
