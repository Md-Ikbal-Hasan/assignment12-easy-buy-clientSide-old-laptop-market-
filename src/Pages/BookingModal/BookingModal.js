import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ bookingProduct }) => {
    const { user } = useContext(AuthContext);
    console.log("in modal:", bookingProduct);
    const { name, resellPrice } = bookingProduct


    const handleBooking = (e) => {
        e.preventDefault();
        const form = e.target;
        // const productName = form.name;
        // const productPrice = form.price;
        // const productId = bookingProduct._id;
        // const buyerName = user.displayName
        // const buyerEmail = form.user.email;
        // const buyerPhone = form.phone;
        // const meetingLocation = form.meetingLocation;
        // const sellerEmail = bookingProduct.sellerEmail;

        const booking = {
            productName: form.name.value,
            productPrice: form.price.value,
            productId: bookingProduct._id,
            buyerName: form.buyerName.value,
            buyerEmail: form.buyerEmail.value,
            buyerPhone: form.buyerPhone.value,
            meetingLocation: form.meetingLocation.value,
            sellerEmail: bookingProduct.sellerEmail
        }
        console.log('Booking:', booking);
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

                        <input type="text" name='buyerPhone' placeholder="Your phone" className="input w-full input-bordered" />

                        <input type="text" name='meetingLocation' placeholder="meeting location" className="input w-full input-bordered" />

                        <input className='w-full btn btn-primary text-white' type="submit" />

                    </form>

                </div>
            </div>


        </>
    );
};

export default BookingModal;