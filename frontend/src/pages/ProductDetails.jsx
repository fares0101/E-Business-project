import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                console.log('Fetching product details for ID:', id);

                if (!id) {
                    console.error('Product ID is undefined or null');
                    setMessage({ text: 'معرف المنتج غير صالح', type: 'danger' });
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                console.log('Product data received:', response.data);

                if (response.data) {
                    setProduct(response.data);
                } else {
                    console.error('No product data in response');
                    setMessage({ text: 'لم يتم العثور على بيانات المنتج', type: 'danger' });
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                console.error('Error details:', error.response?.data || error.message);
                setLoading(false);
                setMessage({
                    text: error.response?.data?.message || 'حدث خطأ أثناء جلب بيانات المنتج',
                    type: 'danger'
                });
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const addToCart = async () => {
        try {
            setAddingToCart(true);
            console.log('Adding product to cart:', id, 'quantity:', quantity);

            const response = await axios.post('http://localhost:5000/api/cart/add', {
                productId: id,
                quantity: quantity
            });

            console.log('Add to cart response:', response.data);
            setMessage({ text: 'تمت إضافة المنتج إلى سلة التسوق بنجاح', type: 'success' });
            setAddingToCart(false);

            // Clear success message after 3 seconds
            setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 3000);

        } catch (error) {
            console.error('Error adding product to cart:', error);
            console.error('Error details:', error.response?.data || error.message);

            setMessage({
                text: error.response?.data?.message || 'حدث خطأ أثناء إضافة المنتج إلى سلة التسوق',
                type: 'danger'
            });

            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">جاري التحميل...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    {message.text || 'المنتج غير موجود أو تم حذفه.'}
                </div>
                <Link to="/products" className="btn btn-primary">العودة إلى المنتجات</Link>
            </div>
        );
    }

    return (
        <div className="product-details-page py-5">
            <div className="container">
                {message.text && (
                    <div className={`alert alert-${message.type} mb-4`}>
                        {message.text}
                    </div>
                )}

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid rounded product-image"
                            style={{ maxHeight: '400px', objectFit: 'contain' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-3">{product.name}</h2>
                        <p className="text-muted mb-2">الفئة: {product.category}</p>
                        <p className="fs-4 fw-bold text-primary mb-3">{product.price} جنيه</p>

                        <div className="mb-4">
                            <h5>الوصف:</h5>
                            <p>{product.description}</p>
                        </div>

                        {product.countInStock > 0 ? (
                            <>
                                <div className="mb-4">
                                    <h5>الكمية:</h5>
                                    <div className="input-group" style={{ maxWidth: '150px' }}>
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={decrementQuantity}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            min="1"
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={incrementQuantity}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-primary"
                                        onClick={addToCart}
                                        disabled={addingToCart}
                                    >
                                        {addingToCart ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                جاري الإضافة...
                                            </>
                                        ) : 'إضافة إلى سلة التسوق'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="alert alert-warning">
                                هذا المنتج غير متوفر حالياً
                            </div>
                        )}

                        <div className="mt-4">
                            <Link to="/products" className="btn btn-outline-secondary">
                                العودة إلى المنتجات
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails; 