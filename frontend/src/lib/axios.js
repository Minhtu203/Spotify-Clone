import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // hoặc baseURL backend của bạn
    withCredentials: true,
});

export const getDaata = (url, params) => {
    return axiosInstance.get(url, params);
};

export default axiosInstance;
