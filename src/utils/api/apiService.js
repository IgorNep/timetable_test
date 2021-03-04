import { getApi, postApi, updateApi, deleteApi } from './api';
import CatchDecorator from '../helpers/catchDecorator';
import ENDPOINTS from './endpoints';

class ApiService {
  constructor(endpoints) {
    if (ApiService.isExist) {
      return ApiService.instance;
    }
    ApiService.instance = this;
    ApiService.isExist = true;
    this.endpoints = endpoints;
  }

  @CatchDecorator
  async addData(endpoint, newData) {
    const formData = {
      data: JSON.stringify(newData),
    };
    // cb(null, true);
    const res = await postApi(this.endpoints[endpoint], formData);
    return await res.data;
  }

  @CatchDecorator
  async getData(endpoint) {
    const res = await getApi(this.endpoints[endpoint]);
    return await res.data;
  }

  @CatchDecorator
  async updateData(endpoint, element) {
    const formData = {
      data: JSON.stringify({
        fieldId: element.fieldId,
        owner: element.owner,
        title: element.title,
      }),
    };
    await updateApi(`${this.endpoints[endpoint]}/${element.id}`, formData);
  }
  @CatchDecorator
  async removeData(endpoint, meeting) {
    await deleteApi(`${this.endpoints[endpoint]}/${meeting.id}`);
  }
}

const apiService = new ApiService(ENDPOINTS);

export { apiService };
