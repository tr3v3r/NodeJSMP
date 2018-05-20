import { Readable } from 'stream';

export default class ConcatStreams extends Readable {
  constructor() {
    super();
    this.streams = [];
  }

  append(stream) {
    this.streams.push(stream);
    stream.on('end', this.onEnd.bind(this));
    stream.on('error', this.onError.bind(this));
  }

  _read(size) {
    const stream = this.streams[0];
    stream.on('readable', () => {
      let content;
      while ((content = stream.read(size)) != null) {
        this.push(`${content}\n\n`);
      }
    });
  }

  onEnd() {
    this.streams[0].removeAllListeners('end');
    this.streams.shift();
    if (this.streams.length == 0) {
      this.push(null);
    } else {
      this._read();
    }
  }

  onError(e) {
    this.emit('error', e);
    this.onEnd();
  }
}
