import axios from 'axios';

import { Activity } from '../types';

const BASE_URL = 'https://fakerestapi.azurewebsites.net';

axios.defaults.baseURL = BASE_URL;

export const getActivities = () => axios.get('/api/v1/Activities');

export const postActivities = (data: Activity) => axios.post('/api/v1/Activities', data);

export const getActivity = (id: number) => axios.get(`/api/v1/Activities/${id}`);

export const putActivity = (id: number, data: Activity) =>
  axios.put(`/api/v1/Activities/${id}`, data);

// NOTE: res.data は空文字？
export const deleteActivity = (id: number) => axios.delete(`/api/v1/Activities/${id}`);
