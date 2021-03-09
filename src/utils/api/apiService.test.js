import { apiService } from './apiService';
import axios from 'axios';

jest.mock('axios');

describe('axios requests should work', () => {
  const events = [
    {
      id: 'f0759cbc-63cc-4cb9-afd8-0917d259fd60',
      data: '{"fieldId":"Monday13","owner":["Maxim"],"title":"Cook food"}',
    },
  ];
  const response = { data: events };

  test('should fetch successfully data from an API', async () => {
    axios.get.mockResolvedValue(response);

    const data = await apiService.getData();
    expect(data).toEqual(events);
  });

  test('should send an error', async () => {
    const error = new Error('Not found');
    axios.get.mockRejectedValue(error);
    const data = await apiService.getData();
    expect(data).toBeInstanceOf(Error);
  });
});

describe('serviceApi should work', () => {
  let fn;
  beforeEach(() => {
    fn = jest.fn();
  });

  test('getData function should work', async () => {
    const getSomeData = async () => {
      const res = await apiService.getData();
      fn();
    };
    await getSomeData();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('addData function should work', async () => {
    const addSomeData = async () => {
      await apiService.addData();
      fn();
    };
    await addSomeData();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('updateData function should work', async () => {
    const updateSomeData = async () => {
      await apiService.updateData();
      fn();
    };
    await updateSomeData();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('deleteData function should work', async () => {
    const deleteSomeData = async () => {
      await apiService.removeData();
      fn();
    };
    await deleteSomeData();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
