# متجر إلكتروني مصري - Egyptian E-Commerce Store

مشروع متجر إلكتروني بالكامل مع واجهة مستخدم عربية وخلفية تقنية متكاملة.

## الميزات

- واجهة مستخدم عربية بالكامل
- عرض المنتجات وتصفيتها حسب الفئة
- صفحة تفاصيل المنتج
- سلة تسوق كاملة الوظائف
- لوحة تحكم المسؤول لإدارة المنتجات والطلبات والمستخدمين
- واجهة برمجة تطبيقات RESTful للتكامل السلس بين الواجهة الأمامية والخلفية

## التقنيات المستخدمة

### الواجهة الأمامية (Frontend)
- React.js
- React Router
- Bootstrap 5
- Axios
- Font Awesome

### الخلفية التقنية (Backend)
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT للمصادقة

## كيفية التشغيل

### متطلبات النظام
- Node.js (v14 أو أحدث)
- MongoDB

### خطوات التثبيت

1. استنساخ المستودع:
```
git clone https://github.com/fares0101/E-Business-project
cd egyptian-ecommerce
```

2. تثبيت تبعيات الخلفية التقنية:
```
cd backend
npm install
```

3. تثبيت تبعيات الواجهة الأمامية:
```
cd ../frontend
npm install
```

4. إنشاء ملف `.env` في مجلد الخلفية التقنية:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/egyptian-ecommerce
JWT_SECRET=your_jwt_secret
```

5. تشغيل الخلفية التقنية:
```
cd backend
npm run dev
```

6. تشغيل الواجهة الأمامية:
```
cd frontend
npm start
```

7. افتح المتصفح على العنوان:
```
http://localhost:3000
```

## هيكل المشروع

```
egyptian-ecommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── utils/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## المساهمة

نرحب بمساهماتكم! يرجى اتباع هذه الخطوات:

1. افتح issue لمناقشة التغيير الذي ترغب في إجرائه
2. قم بعمل fork للمستودع
3. قم بإنشاء فرع جديد لميزتك (`git checkout -b feature/amazing-feature`)
4. قم بتنفيذ التغييرات (`git commit -m 'Add some amazing feature'`)
5. ادفع إلى الفرع (`git push origin feature/amazing-feature`)
6. افتح طلب سحب (Pull Request)

## الترخيص

هذا المشروع مرخص بموجب ترخيص MIT - انظر ملف [LICENSE](LICENSE) للحصول على التفاصيل.

## الاتصال

farse rashad - [@your_linkedin](https://www.linkedin.com/in/fares-rashad-14baba226?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app) - rashadfares608@gmail.com

رابط المشروع: [https://github.com/fares0101/E-Business-project](https://github.com/fares0101/E-Business-project) 