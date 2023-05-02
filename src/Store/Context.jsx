import React,{createContext,useState,useEffect} from "react"
import axios from 'axios'
import  { turfOwnerUrl, userUrl } from '../API/API'
export const userContext = createContext('')

function Context({children}){
    const [user,setUser]=useState('user')
    
    const turfCheck=()=>{
        const token =localStorage.getItem('turfToken');
        const headers={Authorization: token}
        axios.get(`${turfOwnerUrl}authenticate`,{headers}).then((response)=>{
            response.status === 200 ? setUser('turfOwner'): setUser(null);
        }).catch(()=>{
            setUser(null)
        })
    }

    useEffect(()=>{
        const token=localStorage.getItem('userToken')
        if(token){
            const headers={Authorization:token}
            axios.get(`${userUrl}authenticate`,{headers}).then((response)=>{
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

