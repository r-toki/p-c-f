import axios from 'axios';

const BASE_URL = ' https://asia-northeast1-praha-test.cloudfunctions.net';

axios.defaults.baseURL = BASE_URL;

export const getPosts = () => axios.get('/getPosts');

export const createPost = (body: { title: string; body: string }) =>
  axios.post('/createPost', body);

export const toggleFavorite = (body: { id: number }) => axios.post('/favorites', body);
