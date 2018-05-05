import EventEmitter from 'events';
import fs from 'fs';

export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.pathsStorage = {};
    this.filesInFolder = [];
    this.watchFileStats = this.watchFileStats.bind(this);
  }

  watch(path, delay) {
    this.interval = setInterval(this.watchFileStats, delay, path);
    return this;
  }

  addOrRemoveFileDetection(files, path) {
    if (this.filesInFolder.length > files.length) {
      this.filesInFolder.forEach((fileName) => {
        if (!files.includes(fileName)) {
          console.log(`file ${fileName} was removed from folder ${path}`);
        }
      });
    } else if (this.filesInFolder.length < files.length) {
      files.forEach((fileName) => {
        if (!this.filesInFolder.includes(fileName)) {
          console.log(`file ${fileName} was added to folder ${path}`);
        }
      });
    }
    this.filesInFolder = files;
  }

  watchFileStats(path) {
    fs.stat(path, (err, stats) => {
      if (err) {
        console.log(`stop watching: ${err.message}`);
        clearInterval(this.interval);
        return;
      }
      if (stats.isDirectory()) {
        const files = fs.readdirSync(path);
        files.forEach(fileName => this.watchFileStats(`${path}/${fileName}`));
        this.addOrRemoveFileDetection(files, path);
      } else if (stats.isFile()) {
        const ctimeMS = +new Date(stats.ctime);
        if (this.pathsStorage[path] !== ctimeMS) this.emit('changed', path);
        this.pathsStorage[path] = ctimeMS;
      }
    });
  }
}
