import axios from "axios" 

// const API_BASE="http://localhost:4000/"
const API_BASE="http://10.11.74.151:4000/"
export const api=axios.create({
    baseURL:API_BASE,
    headers:{
        "content-Type":"application/json",

    },
});

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token)config.headers.Authorization=`Bearer ${token}`;
    return config;
})



