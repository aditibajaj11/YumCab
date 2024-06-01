import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';




export default function Navbar() {
  let data= useCart() || [];
  console.log("Cart Data:", data);
  const [cartView,setCartView]=useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken") !== null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">YumCab</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav d-flex align-items-center">
              <div className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
              </div>
              {isLoggedIn && (
                <div className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" to="/myOrder">My Orders</Link>
                </div>
              )}
            </div>
            <div className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                <div className="nav-item">
                <button className="btn bg-white text-success mx-3" onClick={()=>{setCartView(true)}}>My Cart {""} <Badge pill bg="danger">{data.length}</Badge></button>
                  </div>
                  {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div className="nav-item">
                  <button className="btn bg-white text-danger" onClick={handleLogout}>Logout</button>
                </div>
                </>
              ) : (
                <>
                  <div className="nav-item">
                    <Link className="nav-link" to="/login">
                      <button className="btn bg-white text-success">Login</button>
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link className="nav-link" to="/createuser">
                      <button className="btn bg-white text-success">SignUp</button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
