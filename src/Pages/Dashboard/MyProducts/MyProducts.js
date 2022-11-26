import { useQuery } from '@tanstack/react-query';

import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../../components/Spinner';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    // const [products, setProducts] = useState([]);
    // const [productsLoading, setProductsLoading] = useState(true);


    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })


    const handleDeleteProduct = (id) => {

        const confirmation = window.confirm("Are you sure to delete this product?")

        if (confirmation) {
            fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.deletedCount === 1) {
                        toast.success("Product deleted successfully!")
                        refetch();
                    }

                })
                .catch(error => {
                    console.log(error);
                    toast.error(error.message)
                })


        }




    }



    const handleAdvertise = (id) => {
        const url = `http://localhost:5000/products/advertise/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("This products is advertised successfully");
                    refetch();
                }
            })


    }

    if (isLoading) {
        return <Spinner></Spinner>
    }



    return (
        <div>
            <h2 className='text-3xl mb-3'>My all products :{products.length} </h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.length ?


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
                                            <td>
                                                {product.paid ?
                                                    <span className='text-green-600 font-semibold'>Sold</span>
                                                    : 'available'}
                                            </td>
                                            <th>
                                                {
                                                    product.paid ?
                                                        <span className='text-green-600 font-semibold'>Already sold</span> :
                                                        <>
                                                            {
                                                                product.advertise ?
                                                                    <button className='btn btn-success btn-xs'>Advertised</button>
                                                                    :
                                                                    <button onClick={() => handleAdvertise(product._id)} className="btn  btn-xs">Advertise Product</button>

                                                            }

                                                        </>
                                                }

                                            </th>

                                            <td>  <button onClick={() => handleDeleteProduct(product._id)} className='btn btn-xs btn-error'>Delete</button>  </td>
                                        </tr>

                                    )
                                })
                                :
                                <tr><td className='text-center text-2xl'>No data available</td></tr>

                        }





                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default MyProducts;