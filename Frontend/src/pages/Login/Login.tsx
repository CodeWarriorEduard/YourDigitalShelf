import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/UseAuth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type loginInput = {
    email: string,
    password: string
}



function Login() {

    const { register, handleSubmit } = useForm<loginInput>();
    const { userLogin } = useAuth();

    const loginToast = (e:string) => toast.error(e);

    const handleLogin = async (data: loginInput) => {
        try{
            const response = await userLogin(data);
        }catch(e: any){
            loginToast(e?.response?.data?.message || "Unexpected error");
        }
    }

    return (
        <div className="bg-accent w-full h-[100vh]">
            <ToastContainer/>
            <div className="text-centerw-4/12  bg-slate-50 h-4/6 flex flex-col p-14 rounded-xl items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h2 className="py-10 text-2xl">Login</h2>
                <form className="flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit(handleLogin)}>
                    <label className="input input-bordered flex items-center gap-2">

                        <input type="email" className="grow" placeholder="Email" {...register('email')} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="password" className="grow" placeholder="Password" {...register('password')} />
                    </label>
                    <button className="btn  btn-primary text-xl my-4 w-40" type="submit">Login</button>
                    <div className="flex m-10 items-center justify-center gap-10">
                        <hr className="w-10" />
                        <p>OR</p>
                        <hr className="w-10" />
                    </div>
                    <Link to={"/register"}><a href="">Create an account!</a></Link>
                </form>
            </div>
        </div>
    )
}

export default Login