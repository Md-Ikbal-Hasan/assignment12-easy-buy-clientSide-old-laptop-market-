import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: bookingProducts = [], isLoading } = useQuery({
        queryKey: ['bookingProduct', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookingProduct/${user?.email}`);
            const data = res.json();
            return data
        }
    })

    console.log(bookingProducts);

    if (isLoading) {
        return <Spinner></Spinner>
    }


    return (
        <div className='m-5'>
            <h2 className="text-3xl my-3">My Orders: {bookingProducts.length}</h2>


            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Pay Amount</th>
                            <th>Delete Order</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookingProducts.length ?


                                bookingProducts.map((product, index) => {
                                    return (
                                        <tr key={product._id}>
                                            <th>{index + 1} </th>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={product.productImage} alt="product" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td> {product.productName} </td>
                                            <td> {product.productPrice} </td>
                                            <td>
                                                {
                                                    product.paid ?
                                                        <button className='btn btn-sm btn-success'>Paid</button>

                                                        :
                                                        <Link to={`/dashboard/payment/${product._id}`}>
                                                            <button className='btn btn-sm btn-primary'>Pay</button>
                                                        </Link>

                                                }
                                            </td>


                                            <td> <button className='btn btn-sm btn-danger'>Delete</button> </td>


                                        </tr>

                                    )
                                })
                                :
                                <tr><td className='text-center text-2xl'>Please order some products</td></tr>

                        }





                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyOrders;