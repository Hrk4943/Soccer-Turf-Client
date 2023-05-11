import axios from "axios"

export const Axiosuser = axios.create({
    baseURL: 'http://localhost:9000/',
})

export const Axiosadmin=axios.create({
    baseURL:'http://localhost:9000/admin/'
})

export const AxiosTurfOwner=axios.create({
    baseURL:'http://localhost:9000/turfOwner/'
})