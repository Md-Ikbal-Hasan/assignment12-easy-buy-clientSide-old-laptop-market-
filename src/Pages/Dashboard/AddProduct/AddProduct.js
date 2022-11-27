import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const [userinfo, setUserinfo] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    // load the user information from the database.......
    useEffect(() => {
        fetch(`https://easy-buy-server.vercel.app/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserinfo(data);

            })
    }, [user?.email])

    console.log("userinfo", userinfo);
    console.log("verified: ", userinfo.verified);


    // load the products categories.............
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://easy-buy-server.vercel.app/categories');
            const data = res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner></Spinner>
    }

    const handleAddProduct = (data) => {

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        // host image to the imgbb server and get the link.........
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    const product = {
                        name: data.name,
                        image: imgData.data.url,
                        category: data.category,
                        description: data.description,
                        location: data.location,
                        resellPrice: data.resellPrice,
                        originalPrice: data.originalPrice,
                        yearOfUsed: data.yearOfUsed,
                        sellerEmail: userinfo?.email,
                        verifiedSeller: userinfo?.verified ? true : false,
                        paid: false,
                        booked: false,
                        advertise: false,
                        dateOfPost: new Date()
                    }

                    console.log("product:", product);


                    // added product to the database.......
                    fetch('https://easy-buy-server.vercel.app/addproduct', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {

                            toast.success(`${data.name} is added successfully`);
                            navigate('/dashboard/myproducts')
                        })


                }
            })






    }
    return (
        <div className='m-5'>
            <h2 className="text-4xl mb-5">Add A Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" {...register("name", {
                        required: "Name is required"
                    })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Photo</span> </label>
                    <input type="file"  {...register("image", {
                        required: "Image is required"
                    })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>

                    <select
                        {...register("category", {
                            required: "category is required"
                        })}

                        className="select select-bordered w-full max-w-xs">

                        {
                            categories.map(category => <option
                                key={category._id}
                                value={category._id}

                            >{category.name} </option>)
                        }
                    </select>
                    {errors.category && <p className='text-red-600'>{errors.category?.message}</p>}
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea type="text" placeholder="description" {...register("description", {
                        required: "Description is required"
                    })}
                        className="textarea input input-bordered w-full max-w-xs" />
                    {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" placeholder="location" {...register("location", {
                        required: "location is required"
                    })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.location && <p className='text-red-600'>{errors.location?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Resell Price</span>
                    </label>
                    <input type="number" placeholder="resell price $" {...register("resellPrice", {
                        required: "resellPrice is required"
                    })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.resellPrice && <p className='text-red-600'>{errors.resellPrice?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Original Price</span>
                    </label>
                    <input type="number" placeholder="original price" {...register("originalPrice", {
                        required: "originalPrice is required $"
                    })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.originalPrice && <p className='text-red-600'>{errors.originalPrice?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Years of Used</span>
                    </label>
                    <input type="text" placeholder="year of used" {...register("yearOfUsed", {
                        required: "yearOfUsed is required"
                    })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.yearOfUsed && <p className='text-red-600'>{errors.yearOfUsed?.message}</p>}
                </div>


                <input type="submit" className='btn btn-primary my-3' value="Add Product" />
            </form>

        </div>
    );
};

export default AddProduct;