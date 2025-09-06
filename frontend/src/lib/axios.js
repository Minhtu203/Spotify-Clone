import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

export const getData = (url, params) => {
    return axiosInstance.get(url, params);
};

export const postData = (url, params) => {
    return axiosInstance.post(url, params);
};

export const deleteData = (url, params) => {
    return axiosInstance.delete(url, params);
};

export default axiosInstance;
