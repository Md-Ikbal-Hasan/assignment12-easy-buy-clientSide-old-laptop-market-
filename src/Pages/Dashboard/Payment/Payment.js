import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const bookingProduct = useLoaderData();
    console.log("loaded bookingProduct:", bookingProduct);
    return (
        <div className='m-5'>
            <h3 className='text-3xl'>Payment for {bookingProduct.productName} </h3>
            <p className='text-xl'> Please pay <strong>${bookingProduct.productPrice}</strong></p>

        </div>
    );
};

export default Payment;