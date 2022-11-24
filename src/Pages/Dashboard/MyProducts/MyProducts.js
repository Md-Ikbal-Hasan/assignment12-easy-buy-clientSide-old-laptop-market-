import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../../../components/Spinner';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${user?.email}`).then(data => {
            setProducts(data.data);
            console.log(data.data);
            setProductsLoading(false);
        })
    }, [user?.email])

    if (productsLoading) {
        return <Spinner></Spinner>
    }


    return (
        <div>
            <h2 className='text-3xl mb-3'>My all products :{products.length} </h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th> serial </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Advertise</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((product, index) => {
                                return (
                                    <tr key={product._id}>
                                        <th>{index + 1} </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={product.image} alt="product" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td> {product.name} </td>
                                        <td>  {product.paid ? 'sold' : 'available'} </td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">Do it</button>
                                        </th>
                                    </tr>

                                )
                            })
                        }





                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default MyProducts;