import apiURL from './apiURL'
const axios = require("axios")

console.log("apiURL ", apiURL, process.env)
const axiosInstance = axios.create({
    baseURL: apiURL,
    headers: {
        Authorization: localStorage.getItem('auth')
    }
}) 

const refresh = () =>  {
    axiosInstance.defaults.headers.Authorization = localStorage.getItem('auth')
    console.log('refreshed')
}

export default axiosInstance
export { refresh }