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
      this.logIfNotIncules(files, filesInFolder, path, 'remove from');     
    } else if (filesInFolder.length < files.length) {
      this.logIfNotIncules(filesInFolder, files, path, 'added to');     
    }
    this.pathsStorage[path] = files;
  }

  watchFileStats(path) {
    fs.stat(path, (err, stats) => {
      if (err) {
        this.handleWatchingError(err);
        return;
      }
      if (stats.isDirectory()) this.watchFilesInDirectory(path);
      else if (stats.isFile()) this.watchFile(path, stats.ctime);
    });
  }

  logIfNotIncules(nextFiles, files, path, messagePrep) {
    files.forEach((fileName) => {
      if (!nextFiles.includes(fileName)) {
        console.log(`file ${fileName} was ${messagePrep} folder ${path}`);
      }
    });
  }

  watchFilesInDirectory(path) {
    const files = fs.readdirSync(path);
    files.forEach(fileName => this.watchFileStats(`${path}/${fileName}`));
    this.addOrRemoveFileDetection(files, path);
  }

  watchFile(path, ctime) {
    const ctimeMS = +new Date(ctime);
    if (this.pathsStorage[path] !== ctimeMS) this.emit('changed', path);
    this.pathsStorage[path] = ctimeMS;
  }

  handleWatchingError(err) {
    console.log(`stop watching: ${err.message}`);
    clearInterval(this.interval);
  }

}
