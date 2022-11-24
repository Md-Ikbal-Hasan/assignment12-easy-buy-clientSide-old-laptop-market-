import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
const Home = () => {
    const { data: products } = useLoaderData();
    const [categories, setCategories] = useState([]);
    console.log(products);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCategories(data);
            })
    }, [])

    return (
        <div className='m-5'>
            <h3 className='text-2xl text-center font-bold'>Category</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    categories.map(category => {
                        return (
                            <button key={category._id}
                                className='p-8 m-2 bg-primary text-2xl text-white text-center font-bold rounded-lg' >
                                {category.name}
                            </button>
                        )
                    })
                }

            </div>

            {
                products.length ?
                    <section className='my-5'>
                        <h2 className="text-2xl font-bold text-center my-5">Advertised products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {

                                products.map(product => {
                                    return (
                                        <div key={product._id} className="card  border">
                                            <figure><img src={product.image} alt="Shoes" /></figure>
                                            <div className="card-body p-3">
                                                <h2 className="card-title">  {product.name} </h2>
                                                <p> <b>Description:</b> {product.description} </p>
                                                <div className='flex justify-between'>
                                                    <p> <b>Used:</b> {product.yearOfUsed} year </p>
                                                    <p> <b>Location:</b> {product.location}</p>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <p> <b>Resell Price:</b> {product.resellPrice} tk </p>
                                                    <p> <b>Original Price:</b> {product.originalPrice} tk</p>
                                                </div>

                                                <p className='flex items-center'>
                                                    <span className='mr-1'><b>Seller:</b> {product.sellerEmail}</span> <FaCheckCircle className='text-blue-600' />
                                                </p>

                                                <button className='btn btn-primary '>Book Now</button>
                                            </div>
                                        </div>
                                    )
                                })

                            }
                        </div>
                    </section>
                    :
                    <></>
            }


        </div>
    );
};

export default Home;