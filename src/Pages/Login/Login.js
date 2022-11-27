import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import login from '../../assets/images/login.jpg'
const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true })
        }
    }, [token, from, navigate])



    const handleLogin = (data) => {
        setLoginError('');

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;

                setLoginUserEmail(user.email);
                navigate(from, { replace: true })
            })
            .catch(error => {
                setLoginError(error.message)
            })
    }


    const handleGoogleSignIn = () => {
        setLoginError('');
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                const role = 'buyer';

                // jodi user login page theke 1st time google diye login kore tar info database a save hobe...
                saveUser(user.displayName, user.email, role)

                toast.success("User logged in successfully");
                setLoginUserEmail(user.email);
                navigate(from, { replace: true })

            })
            .catch(error => {
                setLoginError(error.message)
            })
    }


    // save user info to the database
    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('https://easy-buy-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    // setCreatedUserEmail(email);
                    setLoginUserEmail(email)

                }
            })
            .catch(error => {
                toast.error(error.message);
            })

    }




    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src={login} className="max-w-sm w-full rounded-lg shadow-2xl" alt='login' />

                <div className="card flex-shrink-0 w-full max-w-xs shadow-2xl bg-base-100 ">
                    <form onSubmit={handleSubmit(handleLogin)} >
                        <div className="card-body">
                            <h1 className="text-3xl font-bold">Login</h1>






                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: "Email is required" })}
                                    type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>




                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password",
                                    {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password should be 6 charaters or longer" }
                                    })}
                                    type="password" placeholder="password" className="input input-bordered" />
                                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}



                                {/* <label className="label">
                                <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                            {loginError && <p className='text-red-600'> {loginError} </p>}
                        </div>
                    </form>

                    {/* google sing in  */}
                    <p className='text-center text-sm'>new to Easy Buy? <Link to='/registration' className='text-secondary'>Registration</Link> </p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary w-full'>Continue With Google</button>

                </div>

            </div>
        </div>
    );
};

export default Login;