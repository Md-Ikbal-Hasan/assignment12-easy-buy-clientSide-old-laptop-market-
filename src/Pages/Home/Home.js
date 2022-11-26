import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import SingleProduct from '../Products/SingleProduct';
import BookingModal from '../BookingModal/BookingModal';
const Home = () => {
    const { data } = useLoaderData();
    const [categories, setCategories] = useState([]);
    const [bookingProduct, setBookingProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message)
            })
    }, [])

    return (
        <div className='m-5'>
            <h3 className='text-2xl text-center font-bold'>Category</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    categories.map(category => {
                        return (
                            <Link to={`/products/${category._id}`} key={category._id}
                                className='p-8 m-2 bg-primary text-2xl text-white text-center font-bold rounded-lg' >
                                {category.name}
                            </Link>
                        )
                    })
                }

            </div>

            {
                data.length ?
                    <section className='my-5'>
                        <h2 className="text-2xl font-bold text-center my-5">Advertised products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {

                                data.map(product => <SingleProduct
                                    key={product._id}
                                    product={product}
                                    setBookingProduct={setBookingProduct}>

                                </SingleProduct>)

                            }
                        </div>
                    </section>
                    :
                    <></>
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

export default Home;