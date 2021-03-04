// eslint-disable-next-line import/named
import { apiService } from '../api/apiService';
import Loader from '../../modules/Loader/Loader';

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

ee.subscribe('getUsers', async (params) => {
  const loader = new Loader();
  const { endpoint } = params[0];
  const res = await apiService.getData(endpoint);
  ee.emit('recievedUsers', { res });
  loader.remove();
});

ee.subscribe('getEvents', async (params) => {
  const { endpoint } = params[0];
  const res = await apiService.getData(endpoint);
  ee.emit('recievedEvents', { res });
});

ee.subscribe('addEvent', async (params) => {
  const loader = new Loader();
  const { endpoint, data } = params[0];
  const res = await apiService.addData(endpoint, data);
  ee.emit('getSingleEvent', { res });
  loader.remove();
});

ee.subscribe('updateEvent', async (params) => {
  const loader = new Loader();
  const { endpoint, data } = params[0];
  await apiService.updateData(endpoint, data);
  loader.remove();
});

ee.subscribe('deleteEvent', async (params) => {
  const loader = new Loader();
  const { endpoint, data } = params[0];
  await apiService.removeData(endpoint, data);
  loader.remove();
});
