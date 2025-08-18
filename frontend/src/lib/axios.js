import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // hoặc baseURL backend của bạn
    withCredentials: true,
});

export default axiosInstance;
