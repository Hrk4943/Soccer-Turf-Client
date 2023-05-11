import axios from "axios"

export const Axiosuser = axios.create({
    baseURL: 'http://carzhub.shop/',
})

export const Axiosadmin=axios.create({
    baseURL:'http://carzhub.shop/admin/'
})

export const AxiosTurfOwner=axios.create({
    baseURL:'http://carzhub.shop/turfOwner/'
})