import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
const Home = () => {
    const { data: products } = useLoaderData();
    console.log(products);

    return (
        <div className='m-5'>

            {
                products.length ?
                    <>
                        <h2 className="text-3xl">Advertised products</h2>
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
                    </>
                    :
                    <></>
            }
        </div>
    );
};

export default Home;