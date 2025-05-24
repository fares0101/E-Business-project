import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState({});
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        // Fetch featured products from the API
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/products?limit=4');
                setFeaturedProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching featured products:', error);
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    const addToCart = async (productId) => {
        try {
            setAddingToCart(prev => ({ ...prev, [productId]: true }));
            await axios.post('http://localhost:5000/api/cart/add', {
                productId: productId,
                quantity: 1
            });
            setMessage({ text: 'تمت إضافة المنتج إلى سلة التسوق', type: 'success' });

            // Clear success message after 3 seconds
            setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 3000);

            setAddingToCart(prev => ({ ...prev, [productId]: false }));
        } catch (error) {
            console.error('Error adding to cart:', error);
            setMessage({ text: 'حدث خطأ أثناء إضافة المنتج للسلة', type: 'danger' });
            setAddingToCart(prev => ({ ...prev, [productId]: false }));
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <div className="hero-section text-center py-5 bg-light">
                <div className="container">
                    <h1 className="display-4">مرحباً بك في المتجر الإلكتروني المصري</h1>
                    <p className="lead">اكتشف منتجات عالية الجودة بأسعار تنافسية</p>
                    <Link to="/products" className="btn btn-primary btn-lg mt-3">تسوق الآن</Link>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="featured-products py-5">
                <div className="container">
                    <h2 className="text-center mb-4">منتجات مميزة</h2>

                    {message.text && (
                        <div className={`alert alert-${message.type} mb-4`}>
                            {message.text}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">جاري التحميل...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            {featuredProducts.map(product => (
                                <div className="col-md-3 mb-4" key={product._id}>
                                    <div className="card h-100">
                                        <img
                                            src={product.image}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">
                                                {product.description.length > 100
                                                    ? `${product.description.substring(0, 100)}...`
                                                    : product.description}
                                            </p>
                                            <p className="card-text text-primary fw-bold">{product.price} جنيه</p>
                                            <div className="mt-auto d-flex justify-content-between">
                                                <Link to={`/products/${product._id}`} className="btn btn-outline-primary">
                                                    عرض التفاصيل
                                                </Link>
                                                <button
                                                    className="btn btn-outline-success"
                                                    onClick={() => addToCart(product._id)}
                                                    disabled={addingToCart[product._id]}
                                                >
                                                    {addingToCart[product._id] ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fa fa-cart-plus"></i>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-4">
                        <Link to="/products" className="btn btn-outline-primary">عرض جميع المنتجات</Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4">لماذا تختارنا؟</h2>
                    <div className="row">
                        <div className="col-md-4 text-center mb-4">
                            <div className="feature-icon mb-3">
                                <i className="fa fa-truck fa-3x text-primary"></i>
                            </div>
                            <h4>توصيل سريع</h4>
                            <p>نوفر خدمة توصيل سريعة لجميع محافظات مصر</p>
                        </div>
                        <div className="col-md-4 text-center mb-4">
                            <div className="feature-icon mb-3">
                                <i className="fa fa-shield fa-3x text-primary"></i>
                            </div>
                            <h4>جودة مضمونة</h4>
                            <p>جميع منتجاتنا ذات جودة عالية ومضمونة</p>
                        </div>
                        <div className="col-md-4 text-center mb-4">
                            <div className="feature-icon mb-3">
                                <i className="fa fa-credit-card fa-3x text-primary"></i>
                            </div>
                            <h4>دفع آمن</h4>
                            <p>طرق دفع متعددة وآمنة لراحتك</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home; 