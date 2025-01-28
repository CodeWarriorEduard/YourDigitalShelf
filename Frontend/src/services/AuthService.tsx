import axios from "axios";
import { loginInput, registerInput } from "../types/Form";

const url = import.meta.env.VITE_URL;


export const login = async(input:loginInput) =>{
    try{
        const data = axios.post(url+"/auth/login",input);
        return data;
    }catch(error){
        throw(error);
    }
}




export const signup = async(input: registerInput) =>{
    try{
        const data = axios.post(url+"/auth/signup", input);
        return data;
    }catch(e){
        throw(e);
    }
}