import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            if (!email) {
                throw new Error('User email not found in localStorage');
            }

            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setOrderData(data.orderData);
        } catch (error) {
            console.error("Failed to fetch order data:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData ? (
                        orderData.order_data.slice(0).reverse().map((orderGroup, index) => (
                            <div key={index}>
                                {orderGroup.map((item, idx) => (
                                    <div key={idx}>
                                        {item.Order_date ? (
                                            <div className='m-auto mt-5'>
                                                {item.Order_date}
                                                <hr />
                                            </div>
                                        ) : (
                                            <div className='col-12 col-md-6 col-lg-3' key={item.id}>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{item.qty}</span>
                                                            <span className='m-1'>{item.size}</span>
                                                            <span className='m-1'>{orderGroup.Order_date}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>No orders found</div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

