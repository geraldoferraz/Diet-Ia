import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/get_nutrition_data',
});

export default api;
