import axios from "axios"
import Cookies from "js-cookie"


export const getUser  = async ()=>{
    try{
        const r = await axios.get(`http://localhost:5000/auth/user/`,{
            headers:{
                'Authorization': `${Cookies.get('token')}`
            }
        });
        return r.data;
    }
    catch(e){
        return e.response.data;
    }
}

export const signUp =async (name,email,googleId,avatar)=>{
    try{
        const r= await axios.post(`http://localhost:5000/auth/signup`,{
            name,
            email,
            googleId,
            avatar
        });
        return r.data;
    }
    catch(e){
        return e.response.data;
    }
}

export const loginUser = async (email)=>{
    try{
        const r = await axios.post(`http://localhost:5000/auth/login`,{
            email
    });
    return r.data;
}
    catch(e){
        return e.response.data;
    }
}

