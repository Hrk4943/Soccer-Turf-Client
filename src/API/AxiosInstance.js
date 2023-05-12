import axios from "axios"

export const Axiosuser = axios.create({
    baseURL: 'https://commercefox.ml/',
})

export const Axiosadmin=axios.create({
    baseURL:'https://commercefox.ml/admin/'
})

export const AxiosTurfOwner=axios.create({
    baseURL:'https://commercefox.ml/turfOwner/'
})