import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT!;
export const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
});
