import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../../components/Spinner';

const AllBuyers = () => {

    const { data: allbuyer = [], refetch, isLoading } = useQuery({
        queryKey: ['allbuyer'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allbuyer', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json();
            return data;
        }
    })

    console.log(allbuyer);

    if (isLoading) {
        return <Spinner></Spinner>
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
            <h2 className='text-3xl'>All Buyers</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allbuyer.length ?
                                allbuyer.map((buyer, index) => <tr key={buyer._id}>
                                    <th> {index + 1} </th>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(buyer._id)} className='btn btn-sm btn-error'>Delete</button>

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

export default AllBuyers;