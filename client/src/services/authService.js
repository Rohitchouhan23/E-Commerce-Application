import {api} from "./api"

export const login=async(cred)=>{
    const res=await api.post("/api/login",cred)
    return res.data;
}

export const registerUser=async(cred)=>{
 const res=await api.post("/api/register",cred)
 return res.data;   
}

export const logout = async () => {
  localStorage.removeItem("token");
};