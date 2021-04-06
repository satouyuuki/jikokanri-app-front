import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Cookie } from 'service/cookieService';
// import { MESSAGE } from 'types';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT!;
export const api = axios.create({
  baseURL: API_ENDPOINT + 'api/',
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = new Cookie().token;
  config.headers['Authorization'] = token;
  return config;
});

interface ErrorResponse {
  error: string;
  message: string;
}
api.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (err: AxiosError<ErrorResponse>) => {
    if (err.response) {
      // const errCode = err.response.data.error
      // const message = MESSAGE[errCode]
      const message = err.response.data.message;
      alert(message);
    }
    return err.response;
  }
);
