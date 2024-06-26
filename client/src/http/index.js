import axios from "axios";
import {SERVER_URL} from "../utils/consts";

const $host = axios.create({
    baseURL: SERVER_URL
})

const $authHost = axios.create({
    baseURL: SERVER_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}