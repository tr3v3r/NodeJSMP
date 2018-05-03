import EventEmitter from 'events';
import fs from 'fs';

export default class DirWatcher {
    constructor() {
        this.eventEmitter = new EventEmitter();       
    }

    watch(path, delay) {
        this.eventEmitter.emit('changed')
    }

    onChange(callback) {
      this.eventEmitter.addListener('changed', callback);
      return () => this.eventEmitter.removeListener('changed', callback);
    }
}