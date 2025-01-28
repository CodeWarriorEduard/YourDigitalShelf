import { useForm } from 'react-hook-form'
import { registerInput } from '../../types/Form';
import { useAuth } from '../../Hooks/UseAuth';
import { toast, ToastContainer } from 'react-toastify';



function SignUp() {

    const { register, handleSubmit } = useForm<registerInput>();
    const { userSignUp } = useAuth();

    const signUpToastError = (e:string) => toast.error(e);
    const signUpToastSuccess = (e:string) => toast.success(e);

    const handleSignUp = async (data: registerInput) => {
        try{
            const response = await userSignUp(data);
            signUpToastSuccess(response);
        }catch(e:any){
            signUpToastError(e?.response?.data?.message )
        }
    }

    return (
        <div className="bg-accent w-full h-[100vh]">
            <ToastContainer/>
            <div className=" bg-slate-50 text-center w-4/12 h-4/6 flex flex-col  p-14 rounded-xl items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h2 className="py-10 text-2xl">Create an account!</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignUp)}>
                    <label className="input input-bordered flex items-center gap-2">

                        <input type="text" className="grow" placeholder="Your first name" {...register('firstName')}required />
                    </label>
                    <label className="input input-bordered flex items-center gap-2" >

                        <input type="text" className="grow" placeholder="Your last name" {...register('lastName')}required/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">

                        <input type="text" className="grow" placeholder="Email" {...register('email')} required/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2" >

                        <input type="password" className="grow" placeholder="Password" {...register('password')} required/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2" >
                        <input type="date" className="grow" {...register('yearOfBirth')}required />
                    </label>
                    <button className="btn  btn-primary text-xl my-4 ">Sign Up</button>

                </form>
            </div>
        </div>
    )
}

export default SignUp