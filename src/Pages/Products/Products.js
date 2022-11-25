import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import SingleProduct from './SingleProduct';

const Products = () => {
    const [bookingProduct, setBookingProduct] = useState(null);

    const data = useLoaderData();


    return (
        <div className='m-5'>
            <h1 className='text-3xl text-center'>Products</h1>
            {
                data.length ?
                    <>
                        <section className='my-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {

                                    data.map(product => <SingleProduct
                                        key={product._id}
                                        setBookingProduct={setBookingProduct}
                                        product={product}
                                    >

                                    </SingleProduct>)

                                }
                            </div>

                        </section>
                    </>
                    :
                    <>
                        <h2 className='text-2xl text-center'>No products available under this category</h2>
                    </>
            }

            {
                bookingProduct &&
                <BookingModal
                    bookingProduct={bookingProduct}
                    setBookingProduct={setBookingProduct}
                ></BookingModal>
            }

        </div>
    );
};

export default Products;