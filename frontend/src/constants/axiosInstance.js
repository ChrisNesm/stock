const axios = require("axios")

// const apiURL =  process.env.BACKEND_API_URL || 'https://rooky-back.herokuapp.com/api'
const apiURL =  process.env.BACKEND_API_URL || 'http://localhost:8888/api'

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