import React, { useContext } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SingleProduct = ({ product, setBookingProduct }) => {

    const { user } = useContext(AuthContext);




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
                    <p> <b>Resell Price:</b> {product.resellPrice} $ </p>
                    <p> <b>Original Price:</b> {product.originalPrice} $</p>
                </div>

                <div className='flex items-center'>
                    <span className='mr-1'><b>Seller:</b> {product.sellerEmail}</span> <FaCheckCircle className='text-blue-600' />
                </div>
                {
                    user?.email ? <label onClick={() => setBookingProduct(product)} htmlFor="booking-modal" className="btn btn-primary">Book Product</label>
                        :
                        <Link to='/login' className='btn  btn-success'>  Book Product  </Link>
                }





            </div>
        </div>
    );
};

export default SingleProduct;