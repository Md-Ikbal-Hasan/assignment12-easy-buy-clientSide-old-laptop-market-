import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import toast from 'react-hot-toast';
import SingleProduct from '../Products/SingleProduct';
import BookingModal from '../BookingModal/BookingModal';
import banner from '../../assets/images/banner.jpg'
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

            <div className="hero my-12 ">
                <div className="hero-content flex-col lg:flex-row ">
                    <img src={banner} className="md:max-w-sm rounded-lg shadow-2xl" alt='banner img' />
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold">Buy second hand laptop <br /> with affordable cost</h1>

                        <p className="py-6">
                            Are you searching for used laptop with affordable cost? This is the right place for you. You can find awesome , good quality laptop which condition is absouletly fine. Buy your laptop.
                        </p>

                    </div>
                </div>
            </div>



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