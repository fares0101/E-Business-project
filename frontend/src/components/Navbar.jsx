import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        fetchCartData();

        // Set up an interval to refresh cart data every 2 seconds
        const intervalId = setInterval(() => {
            fetchCartData();
        }, 2000);

        // Clean up the interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart');

            console.log('Fetched cart data:', response.data);

            const items = response.data.items || [];
            setCartItems(items);
            setCartCount(items.length);

            const total = items.reduce((total, item) => total + item.price * item.quantity, 0);
            setCartTotal(total);

            console.log('Cart count:', items.length, 'Cart total:', total);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
            // Refresh cart data after removing an item
            fetchCartData();
        } catch (error) {
            console.error('Error removing item from cart:', error);
            alert('حدث خطأ أثناء حذف المنتج من السلة');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    متجر إلكتروني مصري
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                الرئيسية
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                المنتجات
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">
                                لوحة التحكم
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-light position-relative me-2"
                                type="button"
                                onClick={() => {
                                    setShowCart(!showCart);
                                    // Refresh cart data when opening dropdown
                                    if (!showCart) {
                                        fetchCartData();
                                    }
                                }}
                                aria-expanded={showCart ? 'true' : 'false'}
                            >
                                <i className="fa fa-shopping-cart"></i>
                                {cartCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <div className={`dropdown-menu dropdown-menu-end cart-dropdown ${showCart ? 'show' : ''}`} style={{ minWidth: '300px' }}>
                                <div className="p-3">
                                    <h6 className="mb-3">سلة التسوق</h6>
                                    {cartItems.length === 0 ? (
                                        <p className="text-center mb-0">سلة التسوق فارغة</p>
                                    ) : (
                                        <>
                                            <div className="cart-items">
                                                {cartItems.map((item) => (
                                                    <div key={item._id} className="cart-item d-flex mb-3 align-items-center">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                            className="me-2"
                                                        />
                                                        <div className="flex-grow-1">
                                                            <h6 className="mb-0">{item.name}</h6>
                                                            <small>
                                                                {item.quantity} × {item.price} جنيه
                                                            </small>
                                                        </div>
                                                        <button
                                                            className="btn btn-sm text-danger"
                                                            onClick={() => removeItem(item._id)}
                                                            aria-label="حذف من السلة"
                                                        >
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <span className="fw-bold">الإجمالي: {cartTotal.toFixed(2)} جنيه</span>
                                                <Link to="/cart" className="btn btn-primary btn-sm" onClick={() => setShowCart(false)}>
                                                    عرض السلة
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 