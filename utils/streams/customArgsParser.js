class Arg {
  constructor(description) {
    this.eventName = null;
    this.parentName = null;
    this.description = description;
  }
}

export default class CustomArgsParser {
  constructor() {
    this.args = {};
    this.prevParentArgKey = null;
    this.listeners = {};
    this.events = [];
    this.init();
  }

  init() {
    this.register('--help, -h', 'help', 'Shows the list of all available commands.')
      .on('help', () => {
        if (this.firstEvent === 'help') {
          console.table(this.args, ['description']);
          throw new Error('help action was invoke. Other options was ignored.');
        }
      });
  }

  register(options, eventName, description) {
    const arg = new Arg(description);
    arg.eventName = eventName;
    this.args[options] = arg;
    this.prevParentName = options;
    return this;
  }

  addChild(options, description) {
    const arg = new Arg(description);
    arg.parentName = this.prevParentName;
    this.args[options] = arg;
    return this;
  }

  on(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new Error(`Expected callback to be function but recieved ${typeof callback}`);
    }
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [callback];
    } else {
      this.listeners[eventName].push(callback);
    }
    return this;
  }

  parse(args) {
    try {
      if (!args.length) this.triggerEvent(this.firstEvent = 'help');
      let event = [];
      let prevParentKey;
      args.forEach((arg) => {
        let key;
        let value;
        if (arg.startsWith('--')) [key, value] = arg.split('=');
        else if (arg.startsWith('-')) key = arg;
        else value = arg;
        if (key) {
          const { eventName, registeredKey } = this.checkIfRegistered(key, prevParentKey);
          if (eventName) {
            if (!this.firstEvent) this.firstEvent = eventName;
            if (event.length) this.events.push(event);
            event = [eventName];
            prevParentKey = registeredKey;
          }
        } if (value && event.length) {
          event.push(value);
        }
      });
      this.events.push(event);
      this.triggerEvents();
    } catch (e) {
      console.error(e.message);
    }
  }

  checkIfRegistered(arg, prevParentKey) {
    const registeredKey = Object.keys(this.args).find(key => key.includes(arg));
    const registeredData = this.args[registeredKey];
    if (!registeredData) throw new Error(`The arg with name ${arg} is not registered!`);
    const { eventName, parentName } = registeredData;
    if (parentName && parentName !== prevParentKey) {
      throw new Error(`The prop ${arg} is not compatible with ${prevParentKey}!`);
    }
    return { registeredKey, eventName };
  }

  triggerEvents() {
    this.events.forEach(([eventName, ...callbackArgs] = []) => {
      this.triggerEvent(eventName, ...callbackArgs);
    });
  }

  triggerEvent(eventName, ...args) {
    const listeners = this.listeners[eventName];
    if (Array.isArray(listeners)) {
      listeners.forEach(callback => callback(...args));
    }
  }
}

