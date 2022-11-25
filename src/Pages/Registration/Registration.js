import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/images/login.jpg'
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Registration = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [signUpError, setSignUpError] = useState('');
    const [token] = useToken(createdUserEmail);


    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    // user signup korar por token pele then navigate hobe onno page a
    if (token) {
        navigate(from, { replace: true })
    }


    // create user with email,password
    const handleSignUp = (data) => {
        console.log(data);
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("User Created Successfully");
                const userInfo = {
                    displayName: data.name
                }

                updateUser(userInfo)
                    .then(result => {
                        saveUser(data.name, data.email, data.role)
                    })
                    .catch(error => console.error(error))

            })
            .catch(error => {
                console.log(error);
                setSignUpError(error.message)
            })
    }

    // save user info to the database
    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setCreatedUserEmail(email);

                }
            })
            .catch(error => {
                toast.error(error.message);
            })

    }


    const handleGoogleSignIn = () => {
        setSignUpError('');
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                const role = 'buyer'
                saveUser(user.displayName, user.email, role);
                // setCreatedUserEmail(user.email);
                toast.success("User created successfully")

            })
            .catch(error => {
                setSignUpError(error.message)
            })
    }



    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src={login} className="max-w-sm w-full rounded-lg shadow-2xl" alt='login' />

                <div className="card flex-shrink-0 w-full max-w-xs shadow-2xl bg-base-100 ">
                    <form onSubmit={handleSubmit(handleSignUp)} >
                        <div className="card-body">
                            <h1 className="text-3xl font-bold">Registration</h1>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: "Name is required" })}
                                    type="text" placeholder="name" className="input input-bordered" />
                                {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                            </div>


                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">User Type</span>
                                </label>
                                <select {...register("role", { required: "Type is required" })}
                                    className="select select-bordered">
                                    <option value="buyer">Buyer</option>
                                    <option value="seller"> Seller</option>

                                </select>

                            </div>

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
                                <button type='submit' className="btn btn-primary">Registration</button>
                            </div>
                            {signUpError && <p className='text-red-600'> {signUpError} </p>}
                        </div>
                    </form>

                    {/* google sing in  */}
                    <p className='text-center text-sm'>Already have an account? <Link to='/login' className='text-secondary'>Login</Link> </p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary w-full'>Continue With Google</button>

                </div>

            </div>
        </div>
    );
};

export default Registration;