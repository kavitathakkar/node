import axios from 'axios';

const API = axios.create({
  baseURL: '/', // your backend base URL
});

export default API;
