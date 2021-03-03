/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const customInstance = axios.create({
  baseURL: 'http://158.101.166.74:8080/api/data/igornep',
});

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const getApi = async (url, params) => customInstance.get(url, params);

export const postApi = async (url, formData, params) => {
  const newParams = { ...params, config };
  return await customInstance.post(url, formData, newParams);
};

export const updateApi = async (url, formData, params) => {
  const newParams = { ...params, config };
  return await customInstance.put(url, formData, newParams);
};

export const deleteApi = async (url, formData, params) =>
  await customInstance.delete(url, formData, params);
