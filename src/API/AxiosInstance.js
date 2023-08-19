import axios from "axios"

export const Axiosuser = axios.create({
    baseURL: 'https://soccer-turf5.onrender.com/',
})

export const Axiosadmin=axios.create({
    baseURL:'https://soccer-turf5.onrender.com/admin/'
})

export const AxiosTurfOwner=axios.create({
    baseURL:'https://soccer-turf5.onrender.com/turfOwner/'
})