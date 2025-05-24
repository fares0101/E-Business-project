import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [addingToCart, setAddingToCart] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);

            // Extract unique categories
            const uniqueCategories = [...new Set(response.data.map(product => product.category))];
            setCategories(uniqueCategories);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage({ text: 'حدث خطأ أثناء جلب المنتجات', type: 'danger' });
            setLoading(false);
        }
    };

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

    // Filter products based on category and search query
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="products-page py-5">
            <div className="container">
                <h1 className="mb-4">المنتجات</h1>

                {message.text && (
                    <div className={`alert alert-${message.type} mb-4`}>
                        {message.text}
                    </div>
                )}

                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ابحث عن منتج..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-md-end">
                            <div className="btn-group">
                                <button
                                    className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    جميع المنتجات
                                </button>
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">جاري التحميل...</span>
                        </div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="alert alert-info">
                        لا توجد منتجات متطابقة مع البحث
                    </div>
                ) : (
                    <div className="row">
                        {filteredProducts.map(product => (
                            <div className="col-md-3 col-sm-6 mb-4" key={product._id}>
                                <div className="card h-100 product-card">
                                    <Link to={`/products/${product._id}`}>
                                        <img
                                            src={product.image}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                    </Link>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">
                                            <Link to={`/products/${product._id}`} className="text-decoration-none">
                                                {product.name}
                                            </Link>
                                        </h5>
                                        <p className="card-text text-muted mb-1">{product.category}</p>
                                        <p className="card-text mb-2">
                                            {product.description.length > 100
                                                ? `${product.description.substring(0, 100)}...`
                                                : product.description}
                                        </p>
                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fs-5 fw-bold text-primary">{product.price} جنيه</span>
                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() => addToCart(product._id)}
                                                    disabled={addingToCart[product._id]}
                                                >
                                                    {addingToCart[product._id] ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                            جاري...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fa fa-cart-plus me-1"></i>
                                                            أضف للسلة
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products; 