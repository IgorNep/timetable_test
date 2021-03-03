import ee from '../EventEmitter';
// eslint-disable-next-line import/named
import { apiService } from './apiService';

ee.subscribe('addEvent', async (params) => {
  const { endpoint, data } = params[0];
  const res = await apiService.addData(endpoint, data);
  ee.emit('getSingleEvent', { res });
});

ee.subscribe('getEvents', async (params) => {
  console.log('hello world');
  const { endpoint } = params[0];
  const res = await apiService.getData(endpoint);
  ee.emit('recievedEvents', { res });
});
