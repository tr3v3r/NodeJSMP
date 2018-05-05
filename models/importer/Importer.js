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
      console.log(`file at at path ${path} was updated:`);
      console.log(this.importSync(path));
    });
  }

  onChangeImportAsync() {
    this.watcher.on('changed', (path) => {
      this.import(path).then((data) => {
        console.log(`file at at path ${path} was updated:`);
        console.log(data);
      });
    });
  }

  import(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: 'utf8' }, (error, data) => {
        if (error) reject(error);
        else resolve(csvjson.toObject(data));
      });
    });
  }

  importSync(path) {
    const csv = fs.readFileSync(path, { encoding: 'utf8' });
    return csvjson.toObject(csv);
  }
}
