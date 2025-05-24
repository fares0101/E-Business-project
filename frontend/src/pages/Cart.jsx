import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [processingAction, setProcessingAction] = useState('');
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'Egypt'
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/cart');
            setCartItems(response.data.items || []);
            calculateTotal(response.data.items || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart data:', error);
            setMessage({ text: 'حدث خطأ أثناء جلب بيانات السلة', type: 'danger' });
            setLoading(false);
        }
    };

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(sum);
    };

    const removeItem = async (itemId) => {
        try {
            setProcessingAction(`remove-${itemId}`);
            await axios.delete(`http://localhost:5000/api/cart/${itemId}`);

            // Update the cart locally
            const updatedItems = cartItems.filter(item => item._id !== itemId);
            setCartItems(updatedItems);
            calculateTotal(updatedItems);

            setProcessingAction('');
            setMessage({ text: 'تم حذف المنتج من السلة', type: 'success' });

            // Clear success message after 3 seconds
            setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 3000);
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setProcessingAction('');
            setMessage({ text: 'حدث خطأ أثناء حذف المنتج من السلة', type: 'danger' });
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            setProcessingAction(`update-${itemId}`);
            await axios.put(`http://localhost:5000/api/cart/${itemId}`, { quantity: newQuantity });

            // Update the cart locally
            const updatedItems = cartItems.map(item =>
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            );
            setCartItems(updatedItems);
            calculateTotal(updatedItems);

            setProcessingAction('');
        } catch (error) {
            console.error('Error updating quantity:', error);
            setProcessingAction('');
            setMessage({ text: 'حدث خطأ أثناء تحديث الكمية', type: 'danger' });
        }
    };

    const handleCheckout = async () => {
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            setMessage({ text: 'الرجاء إدخال عنوان الشحن بالكامل', type: 'danger' });
            return;
        }

        try {
            setProcessingAction('checkout');

            // Create order
            await axios.post('http://localhost:5000/api/orders', {
                items: cartItems,
                shippingAddress,
                paymentMethod: 'الدفع عند الاستلام',
                totalPrice: total
            });

            // Clear cart
            await axios.delete('http://localhost:5000/api/cart');

            setCartItems([]);
            setTotal(0);
            setProcessingAction('');
            setMessage({ text: 'تم إنشاء الطلب بنجاح!', type: 'success' });

            // Reset shipping address
            setShippingAddress({
                address: '',
                city: '',
                postalCode: '',
                country: 'Egypt'
            });
        } catch (error) {
            console.error('Error during checkout:', error);
            setProcessingAction('');
            setMessage({ text: 'حدث خطأ أثناء إتمام عملية الشراء', type: 'danger' });
        }
    };

    const handleShippingInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({
            ...prev,
            [name]: value
        }));
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

    return (
        <div className="cart-page py-5">
            <div className="container">
                <h1 className="mb-4">سلة التسوق</h1>

                {message.text && (
                    <div className={`alert alert-${message.type} mb-4`}>
                        {message.text}
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <i className="fa fa-shopping-cart fa-4x text-muted"></i>
                        </div>
                        <h3>السلة فارغة</h3>
                        <p className="text-muted">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.</p>
                        <Link to="/products" className="btn btn-primary mt-3">
                            تصفح المنتجات
                        </Link>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h5 className="mb-0">المنتجات ({cartItems.length})</h5>
                                </div>
                                <div className="card-body">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="row mb-4 border-bottom pb-4">
                                            <div className="col-md-2">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded"
                                                    style={{ maxHeight: '80px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="mb-1">
                                                    <Link to={`/products/${item.productId}`} className="text-decoration-none">
                                                        {item.name}
                                                    </Link>
                                                </h5>
                                                <p className="text-muted mb-0">السعر: {item.price} جنيه</p>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-group" style={{ maxWidth: '120px' }}>
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        disabled={processingAction === `update-${item._id}` || item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="form-control text-center"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        disabled={processingAction === `update-${item._id}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <p className="fw-bold mb-1">{(item.price * item.quantity).toFixed(2)} جنيه</p>
                                            </div>
                                            <div className="col-md-1 text-end">
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeItem(item._id)}
                                                    disabled={processingAction === `remove-${item._id}`}
                                                >
                                                    {processingAction === `remove-${item._id}` ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        <i className="fa fa-trash"></i>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">ملخص الطلب</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>المجموع ({cartItems.length} منتجات)</span>
                                        <span className="fw-bold">{total.toFixed(2)} جنيه</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>الشحن</span>
                                        <span className="text-success">مجاني</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-4">
                                        <span className="fw-bold">الإجمالي</span>
                                        <span className="fs-5 fw-bold">{total.toFixed(2)} جنيه</span>
                                    </div>

                                    <div className="mb-3">
                                        <h6>عنوان الشحن</h6>
                                        <div className="form-group mb-2">
                                            <label htmlFor="address" className="form-label">العنوان</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className="form-control"
                                                value={shippingAddress.address}
                                                onChange={handleShippingInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="city" className="form-label">المدينة</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                className="form-control"
                                                value={shippingAddress.city}
                                                onChange={handleShippingInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="postalCode" className="form-label">الرمز البريدي</label>
                                            <input
                                                type="text"
                                                id="postalCode"
                                                name="postalCode"
                                                className="form-control"
                                                value={shippingAddress.postalCode}
                                                onChange={handleShippingInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={handleCheckout}
                                        disabled={processingAction === 'checkout' || cartItems.length === 0}
                                    >
                                        {processingAction === 'checkout' ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                جاري إتمام الطلب...
                                            </>
                                        ) : (
                                            'إتمام الشراء'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart; 