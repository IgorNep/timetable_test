import axios from 'axios';
import CatchDecorator from '../helpers/catchDecorator';
import ENDPOINTS, { EVENTS } from './endpoints';

const getConfig = () => {
  return {
    headers: {
      'Content-type': 'application/json',
    },
  };
};

class ApiService {
  constructor(baseUrl, endpoints) {
    if (ApiService.isExist) {
      return ApiService.instance;
    }
    ApiService.instance = this;
    ApiService.isExist = true;
    this.endpoints = endpoints;
    this.baseUrl = baseUrl;
  }
  @CatchDecorator
  async getData(endpoint = EVENTS) {
    const res = await axios.get(`${this.baseUrl}${this.endpoints[endpoint]}`);
    return await res.data;
  }
  @CatchDecorator
  async addData(endpoint = EVENTS, newData, params) {
    const formData = {
      data: JSON.stringify(newData),
    };
    const config = getConfig();
    const newParams = { ...params, config };
    const res = await axios.post(
      `${this.baseUrl}${this.endpoints[endpoint]}`,
      formData,
      newParams
    );
    return await res.data;
  }
  @CatchDecorator
  async updateData(endpoint = EVENTS, event, params) {
    const formData = {
      data: JSON.stringify({
        fieldId: event.fieldId,
        owner: event.owner,
        title: event.title,
      }),
    };
    const config = getConfig();
    const newParams = { ...params, config };
    const res = await axios.put(
      `${this.baseUrl}${this.endpoints[endpoint]}/${event.id}`,
      formData,
      newParams
    );
    return await res.data;
  }
  @CatchDecorator
  async removeData(endpoint, event) {
    await axios.delete(
      `${this.baseUrl}${this.endpoints[endpoint]}/${event.id}`
    );
  }
}

const apiService = new ApiService(
  'http://158.101.166.74:8080/api/data/igornep',
  ENDPOINTS
);

export { apiService };
