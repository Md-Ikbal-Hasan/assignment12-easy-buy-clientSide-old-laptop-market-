import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../../components/Spinner';

const AllSellers = () => {

    const { data: allseller = [], refetch, isLoading } = useQuery({
        queryKey: ['allseller'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allseller', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json();
            return data;
        }
    })

    console.log(allseller);

    if (isLoading) {
        return <Spinner></Spinner>
    }

    const handleVerifySeller = (id) => {
        console.log("verify seller id: ", id);

        fetch(`http://localhost:5000/verifyseller/${id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    toast.success("Seller is verified!");
                    refetch();
                }
            })
            .catch(error => {
                console.log(error);
            })

    }


    const handleDeleteUser = (id) => {
        console.log(id);

        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount === 1) {
                    toast.success("User Deleted Successfully!");
                    refetch()
                }
            })
            .catch(error => {
                toast.error(error.message)
                console.log(error);
            })


    }


    return (
        <div className='m-5'>
            <h2 className='text-3xl'>All Sellers : {allseller.length} </h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verify User</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allseller.length ?
                                allseller.map((seller, index) => <tr key={seller._id}>
                                    <th> {index + 1} </th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    {
                                        seller.verified ?
                                            <td  > <button className='btn btn-sm btn-success'>Verified</button> </td>
                                            :
                                            <td onClick={() => handleVerifySeller(seller._id)} > <button className='btn btn-sm btn-primary'>Verify</button> </td>

                                    }

                                    <td>
                                        <button onClick={() => handleDeleteUser(seller._id)} className='btn btn-sm btn-error'>Delete</button>
                                    </td>
                                </tr>)

                                :
                                <tr><td className='text-center text-2xl'>Please order some products</td></tr>

                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;