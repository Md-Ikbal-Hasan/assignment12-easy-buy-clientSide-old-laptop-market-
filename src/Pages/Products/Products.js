import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';

const Products = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className='m-5'>
            <h1 className='text-3xl text-center'>Products</h1>
            {
                data.length ?
                    <>
                        <section className='my-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {

                                    data.map(product => {
                                        return (
                                            <div key={product._id} className="card  border">
                                                <figure><img src={product.image} className="h-96 w-full" alt="Shoes" /></figure>
                                                <div className="card-body p-3">
                                                    <h2 className="card-title">  {product.name} </h2>
                                                    <p> <b>Description:</b> {product.description} </p>
                                                    <div className='flex md:justify-between flex-col md:flex-row'>
                                                        <p> <b>Used:</b> {product.yearOfUsed} year </p>
                                                        <p> <b>Location:</b> {product.location}</p>
                                                    </div>
                                                    <div className='flex md:justify-between flex-col md:flex-row'>
                                                        <p> <b>Resell Price:</b> {product.resellPrice} tk </p>
                                                        <p> <b>Original Price:</b> {product.originalPrice} tk</p>
                                                    </div>

                                                    <div className='flex items-center'>
                                                        <span className='mr-1'><b>Seller:</b> {product.sellerEmail}</span> <FaCheckCircle className='text-blue-600' />
                                                    </div>

                                                    <button className='btn btn-primary '>Book Now</button>
                                                </div>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                        </section>
                    </>
                    :
                    <>
                        <h2 className='text-2xl text-center'>No products available under this category</h2>
                    </>
            }

        </div>
    );
};

export default Products;