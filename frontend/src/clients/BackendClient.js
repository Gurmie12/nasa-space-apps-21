import axios from "axios";

const defaultAxios = {
    baseURL: 'http://localhost:3030'
}

const API = axios.create(defaultAxios);

export default API;