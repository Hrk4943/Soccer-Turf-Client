import React,{createContext,useState,useEffect} from "react"
import axios from 'axios'
import  { AxiosTurfOwner, Axiosuser } from '../API/AxiosInstance'
export const userContext = createContext('')

function Context({children}){
    const [user,setUser]=useState('user')
    
    const turfCheck=()=>{
        const token =localStorage.getItem('turfToken');
        const headers={Authorization: token}
        AxiosTurfOwner.get(`authenticate`,{headers}).then((response)=>{
            response.status === 200 ? setUser('turfOwner'): setUser(null);
        }).catch(()=>{
            setUser(null)
        })
    }

    useEffect(()=>{
        const token=localStorage.getItem('userToken')
        if(token){
            const headers={Authorization:token}
            Axiosuser.get(`authenticate`,{headers}).then((response)=>{
                response.status === 200 ? setUser("user") : turfCheck()
            }).catch(()=>{
              turfCheck()
            })
        } else {
            turfCheck()
        }
    },[])

    return(
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>
    )

}

export default Context

