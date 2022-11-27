import React, { useContext } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SingleProduct = ({ product, setBookingProduct }) => {
    const { _id, image, name, description, yearOfUsed, location, resellPrice, originalPrice, sellerEmail, verifiedSeller, dateOfPost } = product;

    const { user } = useContext(AuthContext);




    return (
        <div key={_id} className="card  border">
            <figure><img src={image} className="h-96 w-full" alt="Shoes" /></figure>
            <div className="card-body p-3">
                <h2 className="card-title">  {name} </h2>
                <p> <b>Description:</b> {description} </p>
                <div className='flex md:justify-between flex-col md:flex-row'>
                    <p> <b>Used:</b> {yearOfUsed} year </p>
                    <p> <b>Location:</b> {location}</p>
                </div>
                <div className='flex md:justify-between flex-col md:flex-row'>
                    <p> <b>Resell Price:</b> {resellPrice}$ </p>
                    <p> <b>Original Price:</b> {originalPrice}$</p>
                </div>

                <div className='flex items-center'>
                    <span className='mr-1'><b>Seller:</b> {sellerEmail}</span>
                    {
                        verifiedSeller && <FaCheckCircle className='text-blue-600' />
                    }

                </div>

                <p> <b>Date of Post: </b>{dateOfPost} </p>
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