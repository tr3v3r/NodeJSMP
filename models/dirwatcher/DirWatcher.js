import EventEmitter from 'events';
import fs from 'fs';

export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.pathsStorage = {};
    this.watchFileStats = this.watchFileStats.bind(this);
  }

  watch(path, delay) {
    this.interval = setInterval(this.watchFileStats, delay, path);
    return this;
  }

  addOrRemoveFileDetection(files, path) {
    const filesInFolder = this.pathsStorage[path] || [];
    if (filesInFolder.length > files.length) {
      filesInFolder.forEach((fileName) => {
        if (!files.includes(fileName)) {
          console.log(`file ${fileName} was removed from folder ${path}`);
        }
      });
    } else if (filesInFolder.length < files.length) {
      files.forEach((fileName) => {
        if (!filesInFolder.includes(fileName)) {
          console.log(`file ${fileName} was added to folder ${path}`);
        }
      });
    }
    this.pathsStorage[path] = files;
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
