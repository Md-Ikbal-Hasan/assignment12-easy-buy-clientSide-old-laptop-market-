import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ bookingProduct, setBookingProduct }) => {
    const { user } = useContext(AuthContext);


    const { name, resellPrice } = bookingProduct;

    const navigate = useNavigate();


    const handleBooking = (e) => {
        e.preventDefault();
        const form = e.target;

        const booking = {
            productImage: bookingProduct.image,
            productName: form.name.value,
            productPrice: form.price.value,
            productId: bookingProduct._id,
            categoryId: bookingProduct.category,
            buyerName: form.buyerName.value,
            buyerEmail: form.buyerEmail.value,
            buyerPhone: form.buyerPhone.value,
            meetingLocation: form.meetingLocation.value,
            sellerEmail: bookingProduct.sellerEmail,
            paid: false

        }

        // add booking product to the database..........
        fetch('https://easy-buy-server.vercel.app/bookingProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Product booked successfully!");
                    setBookingProduct(null);
                    navigate('/dashboard')
                }
            })
            .catch(error => {
                toast.error(error.message);
                console.log(error);
            })


    }



    return (
        <>

            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" name='name' value={name} disabled placeholder="product name" className="input w-full input-bordered" />

                        <input type="text" name='price' value={resellPrice} disabled placeholder="price" className="input w-full input-bordered" />

                        <input type="text" name='buyerName' defaultValue={user?.displayName} disabled placeholder="Buyer Name" className="input w-full input-bordered" />

                        <input type="text" name='buyerEmail' defaultValue={user?.email} disabled placeholder="Buyer email" className="input w-full input-bordered" />

                        <input type="text" name='buyerPhone' required placeholder="Your phone" className="input w-full input-bordered" />

                        <input type="text" name='meetingLocation' required placeholder="meeting location" className="input w-full input-bordered" />

                        <button className='w-full btn btn-primary text-white' type="submit" > Book</button>

                    </form>

                </div>
            </div>


        </>
    );
};

export default BookingModal;