import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const bookingProduct = useLoaderData();
    return (
        <div className='m-5'>
            <h3 className='text-3xl'>Payment for {bookingProduct.productName} </h3>
            <p className='text-xl'> Please pay <strong>${bookingProduct.productPrice}</strong></p>

            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm bookingProduct={bookingProduct} ></CheckoutForm>
                </Elements>
            </div>

        </div>
    );
};

export default Payment;