import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


function Header() {
    const { totalItems } = useCart();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand me-3" to="/">DD</Link>
                <div className="collapse navbar-collapse show" id="navbarNav">
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item position-relative">
                            <Link className="nav-link" to="/mycart">
                                MyCart
                                {totalItems > 0 && (
                                    <span className="badge bg-danger ms-2">{totalItems}</span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
