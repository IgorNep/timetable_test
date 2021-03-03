class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    // eslint-disable-next-line no-unused-expressions
    !this.events[eventName] && (this.events[eventName] = []);
    this.events[eventName].push(callback);
  }

  unsubscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(
      (eventCallBack) => callback !== eventCallBack,
    );
  }

  emit(eventName, ...args) {
    const event = this.events[eventName];
    // eslint-disable-next-line no-unused-expressions
    event && event.forEach((callback) => callback.call(null, args));
  }
}
const ee = new EventEmitter();

export default ee;
