import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, signup } from "../services/AuthService";
import { loginInput, registerInput } from "../types/Form";


type UserContextType = {
    token : string | null,
    userLogin: (input: loginInput) => void;
    userSignUp: (input:registerInput) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}


type Props = {children: React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) =>{

    const navigate = useNavigate();
    const [token, setToken] = useState<string|null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      const localToken = localStorage.getItem("token");
      if(localToken){
        setToken(localToken);
        axios.defaults.headers.common["Authorization"] = "Bearer "+token;
      }
      setIsReady(true);
    }, [])
    

    const userLogin = async (input:loginInput) => { 
        try{
            const res = await login(input);
            if(res){
                localStorage.setItem("token", res?.data.token);
                setToken(res?.data.token);               
                navigate("/home");
            }
        }catch(error){
            throw error;
        }
        
    }

    const userSignUp = async(input:registerInput) =>{
        await signup(input)
            .then((res)=>{
                if(res){
                    navigate("/login")
                    return res;
                }
            })
            .catch((e) => {throw e}); 
    }

    const isLoggedIn = () =>{
        return !!token;
    };


    const logout = () =>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
    }

    return (
        <UserContext.Provider value={{token, userLogin, userSignUp, logout, isLoggedIn}}>
            {isReady ? children : null}
        </UserContext.Provider>
    )

}


export const useAuth = () => React.useContext(UserContext);