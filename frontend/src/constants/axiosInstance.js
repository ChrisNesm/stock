const axios = require("axios")

const apiURL =  process.env.BACKEND_API_URL || 'http://localhost:8888/api'

const axiosInstance = axios.create({
    baseURL: apiURL,
    headers: {
        Authorization: localStorage.getItem('auth')
    }
}) 

const refresh = () =>  {
    console.log('refreshed')
}

export default axiosInstance
export { refresh }