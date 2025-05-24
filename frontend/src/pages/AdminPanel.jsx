import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('products');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        countInStock: ''
    });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsResponse, ordersResponse] = await Promise.all([
                axios.get('http://localhost:5000/api/products'),
                axios.get('http://localhost:5000/api/orders')
            ]);
            setProducts(productsResponse.data);
            setOrders(ordersResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage({ text: 'حدث خطأ أثناء جلب البيانات', type: 'danger' });
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/products/${editId}`, formData);
                setMessage({ text: 'تم تحديث المنتج بنجاح', type: 'success' });
            } else {
                await axios.post('http://localhost:5000/api/products', formData);
                setMessage({ text: 'تم إضافة المنتج بنجاح', type: 'success' });
            }
            resetForm();
            fetchData();
        } catch (error) {
            console.error('Error saving product:', error);
            setMessage({ text: 'حدث خطأ أثناء حفظ المنتج', type: 'danger' });
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            countInStock: product.countInStock
        });
        setEditId(product._id);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                setMessage({ text: 'تم حذف المنتج بنجاح', type: 'success' });
                fetchData();
            } catch (error) {
                console.error('Error deleting product:', error);
                setMessage({ text: 'حدث خطأ أثناء حذف المنتج', type: 'danger' });
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            image: '',
            category: '',
            countInStock: ''
        });
        setEditId(null);
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status });
            setMessage({ text: 'تم تحديث حالة الطلب بنجاح', type: 'success' });
            fetchData();
        } catch (error) {
            console.error('Error updating order status:', error);
            setMessage({ text: 'حدث خطأ أثناء تحديث حالة الطلب', type: 'danger' });
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

    return (
        <div className="admin-panel py-5">
            <div className="container">
                <h1 className="mb-4">لوحة التحكم</h1>

                {message.text && (
                    <div className={`alert alert-${message.type} mb-4`}>
                        {message.text}
                    </div>
                )}

                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            إدارة المنتجات
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            إدارة الطلبات
                        </button>
                    </li>
                </ul>

                {activeTab === 'products' && (
                    <>
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="m-0">{editId ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">اسم المنتج</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="price" className="form-label">السعر</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="category" className="form-label">الفئة</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="category"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="countInStock" className="form-label">الكمية المتوفرة</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="countInStock"
                                                name="countInStock"
                                                value={formData.countInStock}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">رابط الصورة</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="image"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">وصف المنتج</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            rows="3"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button type="submit" className="btn btn-primary">
                                            {editId ? 'تحديث المنتج' : 'إضافة المنتج'}
                                        </button>
                                        {editId && (
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={resetForm}
                                            >
                                                إلغاء
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h5 className="m-0">قائمة المنتجات</h5>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>الصورة</th>
                                                <th>الاسم</th>
                                                <th>السعر</th>
                                                <th>الفئة</th>
                                                <th>المخزون</th>
                                                <th>الإجراءات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product._id}>
                                                    <td>
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                        />
                                                    </td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price} جنيه</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.countInStock}</td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button
                                                                className="btn btn-sm btn-primary"
                                                                onClick={() => handleEdit(product)}
                                                            >
                                                                تعديل
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => handleDelete(product._id)}
                                                            >
                                                                حذف
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div className="card">
                        <div className="card-header">
                            <h5 className="m-0">قائمة الطلبات</h5>
                        </div>
                        <div className="card-body">
                            {orders.length === 0 ? (
                                <p className="text-center">لا توجد طلبات حتى الآن</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>رقم الطلب</th>
                                                <th>اسم العميل</th>
                                                <th>تاريخ الطلب</th>
                                                <th>المبلغ الإجمالي</th>
                                                <th>حالة الطلب</th>
                                                <th>الإجراءات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order._id}>
                                                    <td>{order._id.substring(0, 8)}...</td>
                                                    <td>{order.user?.name || 'مستخدم غير معروف'}</td>
                                                    <td>{new Date(order.createdAt).toLocaleDateString('ar-EG')}</td>
                                                    <td>{order.totalPrice} جنيه</td>
                                                    <td>
                                                        <span className={`badge ${order.status === 'pending' ? 'bg-warning' :
                                                                order.status === 'processing' ? 'bg-info' :
                                                                    order.status === 'shipped' ? 'bg-primary' :
                                                                        order.status === 'delivered' ? 'bg-success' : 'bg-secondary'
                                                            }`}>
                                                            {order.status === 'pending' ? 'قيد الانتظار' :
                                                                order.status === 'processing' ? 'قيد المعالجة' :
                                                                    order.status === 'shipped' ? 'تم الشحن' :
                                                                        order.status === 'delivered' ? 'تم التسليم' : 'ملغي'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" id={`dropdownMenuButton-${order._id}`} data-bs-toggle="dropdown" aria-expanded="false">
                                                                تغيير الحالة
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${order._id}`}>
                                                                <li><button className="dropdown-item" onClick={() => updateOrderStatus(order._id, 'pending')}>قيد الانتظار</button></li>
                                                                <li><button className="dropdown-item" onClick={() => updateOrderStatus(order._id, 'processing')}>قيد المعالجة</button></li>
                                                                <li><button className="dropdown-item" onClick={() => updateOrderStatus(order._id, 'shipped')}>تم الشحن</button></li>
                                                                <li><button className="dropdown-item" onClick={() => updateOrderStatus(order._id, 'delivered')}>تم التسليم</button></li>
                                                                <li><button className="dropdown-item" onClick={() => updateOrderStatus(order._id, 'cancelled')}>إلغاء</button></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel; 