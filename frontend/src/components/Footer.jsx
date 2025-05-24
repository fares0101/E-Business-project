import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h5>متجر إلكتروني مصري</h5>
                        <p>منصة تسوق إلكتروني مصرية توفر منتجات عالية الجودة بأسعار تنافسية مع توصيل سريع لجميع محافظات مصر.</p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5>روابط سريعة</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-decoration-none text-white">الرئيسية</Link></li>
                            <li className="mb-2"><Link to="/products" className="text-decoration-none text-white">المنتجات</Link></li>
                            <li className="mb-2"><Link to="/cart" className="text-decoration-none text-white">سلة التسوق</Link></li>
                            <li className="mb-2"><Link to="/admin" className="text-decoration-none text-white">لوحة التحكم</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5>تواصل معنا</h5>
                        <address>
                            <p>
                                <i className="fa fa-map-marker me-2"></i>
                                القاهرة، مصر
                            </p>
                            <p>
                                <i className="fa fa-envelope me-2"></i>
                                <a href="mailto:info@egyptstore.com" className="text-decoration-none text-white">info@egyptstore.com</a>
                            </p>
                            <p>
                                <i className="fa fa-phone me-2"></i>
                                <a href="tel:+20123456789" className="text-decoration-none text-white">+20 123 456 789</a>
                            </p>
                        </address>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="mb-0">
                            &copy; {new Date().getFullYear()} متجر إلكتروني مصري. جميع الحقوق محفوظة.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 