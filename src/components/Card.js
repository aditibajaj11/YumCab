// Card.js

import React, { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || ''); 

  const handleAddToCart = async () => {
    const finalPrice = parseInt(options[size]) * qty;
    let existingFood = null;

    for (const item of data) {
      if (item.id === props.foodItem._id && item.size === size) {
        existingFood = item;
        break;
      }
    }

    if (existingFood) {
      // Update the quantity and price of the existing item in the cart
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty
      });
    } else {
      // Add the item to the cart
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size
      });
    }
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: '150px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success" onChange={(e) => setQty(parseInt(e.target.value))}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className="m-2 h-100 bg-success" onChange={(e) => setSize(e.target.value)} value={size}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className="d-inline h-100">
              ₹{parseInt(options[size]) * qty}/-
            </div>
          </div>
          <hr />
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
