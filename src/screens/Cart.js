import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

export default function Cart() {
    const data = useCart() || [];
    const dispatch = useDispatchCart();
    const [error, setError] = useState(null);

    const handleCheckoutClick = async () => {
        try {
            if (data.length === 0) {
                throw new Error("Cart is empty. Please add items to proceed with checkout.");
            }

            // Assuming you have the user email stored in localStorage
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail) {
                throw new Error("User email not found.");
            }

            const response = await fetch("http://localhost:5000/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    order_data: data,
                    order_date: new Date().toISOString()
                })
            });
            console.log('Response Status:', response.status);

            if (!response.ok) {
                throw new Error("Failed to place order. Please try again later.");
            }

            dispatch({ type: "DROP" });
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const totalPrice = data.reduce((total, item) => total + (item.price * item.qty), 0);

    return (
        <div>
            {error && <div className="error">{error}</div>}
            {data.length === 0 ? (
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            ) : (
                <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                    <table className='table table-hover'>
                        <thead className='text-success fs-4'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Option</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.size}</td>
                                    <td>{item.price * item.qty}</td>
                                    <td>
                                        <IconButton onClick={() => dispatch({ type: "REMOVE", index: index })}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                    <div>
                        <button className='btn bg-success mt-5' onClick={handleCheckoutClick}>Check Out</button>
                    </div>
                </div>
            )}
        </div>
    );
}



