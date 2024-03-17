import axios from 'axios';
import md5 from 'md5';

function generateHash(timestamp: string, publicKey: string, privateKey: string) {
    return md5(timestamp + privateKey + publicKey);
}

const { VITE_BASE_API_URL, VITE_API_KEY, VITE_PRIVATE_KEY } = import.meta.env;

const instance = axios.create({
    baseURL: VITE_BASE_API_URL,
    params: {
        apikey: VITE_API_KEY
    }
});

instance.interceptors.request.use(config => {
    const timestamp = new Date().getTime().toString(); // Получаем текущую метку времени
    const hash = generateHash(timestamp, VITE_API_KEY, VITE_PRIVATE_KEY);

    config.params = {
        ...config.params,
        ts: timestamp,
        hash: hash
    };

    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;
