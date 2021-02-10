import axios from 'axios';

const api = axios.create({
    baseURL: 'https://challange.goomer.com.br',
})

export default api;