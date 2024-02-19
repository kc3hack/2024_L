import Axios from 'axios';
import { API_URL } from '@/config';

const headers: { [key: string]: string } = {
    "Content-type": "application/json",
};
export const axios = Axios.create({
    baseURL: API_URL,
    headers
});
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);