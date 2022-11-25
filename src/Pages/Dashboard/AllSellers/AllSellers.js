import { useQuery } from '@tanstack/react-query';
import React from 'react';
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


    return (
        <div className='m-5'>
            <h2 className='text-3xl'>All Sellers</h2>
        </div>
    );
};

export default AllSellers;