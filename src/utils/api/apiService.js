import { getApi, postApi, updateApi, deleteApi } from './api';
import Catch from '../helpers/catchDecorator';
import ENDPOINTS from './endpoints';
import getConfig from './apiConfig';

class ApiService {
  constructor(endpoints) {
    if (ApiService.isExist) {
      return ApiService.instance;
    }
    ApiService.instance = this;
    ApiService.isExist = true;
    this.endpoints = endpoints;
  }
  @Catch
  async getData(endpoint) {
    const res = await getApi(this.endpoints[endpoint]);
    return await res.data;
  }

  async addData(endpoint, newData, cb) {
    const formData = {
      data: JSON.stringify(newData),
    };
    const config = getConfig();
    cb(null, true);
    const res = await postApi(this.endpoints[endpoint], formData, config);
    return await res.data;
  }

  async updateData(endpoint, element) {
    const config = getConfig();
    const formData = {
      data: JSON.stringify({
        fieldId: element.fieldId,
        owner: element.owner,
        title: element.title,
      }),
    };
    await updateApi(
      `${this.endpoints[endpoint]}/${element.id}`,
      formData,
      config,
    );
  }

  async removeData(endpoint, meeting) {
    await deleteApi(`${this.endpoints[endpoint]}/${meeting.id}`);
  }
}

export const apiService = new ApiService(ENDPOINTS);
