import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});


//Request interceptor to add token to headers if available
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401){
                window.location.href = '/';
            }
            else if(error.response.status === 500){
                alert('Internal Server Error');
            }
        }
        else if (error.code === 'ECONNABORTED') {
            alert('Request timed out. Please try again later.');
        }
        return Promise.reject(error);


    }
)

export default axiosInstance;