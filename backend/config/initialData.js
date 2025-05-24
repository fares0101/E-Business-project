const products = [
    {
        name: 'موبايل سامسونج جالاكسي S21',
        image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
        description:
            'هاتف ذكي متطور من سامسونج بشاشة AMOLED مقاس 6.2 بوصة وكاميرا ثلاثية بدقة 64 ميجابكسل وبطارية 4000 مللي أمبير.',
        brand: 'سامسونج',
        category: 'الكترونيات',
        price: 12999.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'لابتوب ديل انسبايرون 15',
        image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg',
        description:
            'لابتوب قوي للأعمال والترفيه مع معالج Intel Core i7 وذاكرة 16GB وقرص صلب SSD سعة 512GB.',
        brand: 'ديل',
        category: 'الكترونيات',
        price: 15499.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
    },
    {
        name: 'سماعات ايربودز برو',
        image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
        description:
            'سماعات لاسلكية مع خاصية إلغاء الضوضاء النشط وجودة صوت ممتازة وعمر بطارية طويل.',
        brand: 'ابل',
        category: 'الكترونيات',
        price: 4299.99,
        countInStock: 15,
        rating: 4.8,
        numReviews: 20,
    },
    {
        name: 'تلفزيون سامسونج 55 بوصة QLED',
        image: 'https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg',
        description:
            'تلفزيون ذكي بتقنية QLED مع دقة 4K وتقنية HDR وتطبيقات ذكية متعددة.',
        brand: 'سامسونج',
        category: 'الكترونيات',
        price: 9999.99,
        countInStock: 5,
        rating: 4.3,
        numReviews: 10,
    },
    {
        name: 'كنبة جلد ثلاثية',
        image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
        description:
            'كنبة جلد أنيقة وعصرية بثلاثة مقاعد مريحة ومتينة مناسبة لغرفة المعيشة.',
        brand: 'ايكيا',
        category: 'أثاث',
        price: 7499.99,
        countInStock: 3,
        rating: 4.6,
        numReviews: 15,
    },
    {
        name: 'بلاي ستيشن 5',
        image: 'https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg',
        description:
            'أحدث جهاز ألعاب من سوني مع معالج قوي ورسومات عالية الدقة وتجربة لعب سلسة.',
        brand: 'سوني',
        category: 'الكترونيات',
        price: 14999.99,
        countInStock: 2,
        rating: 4.9,
        numReviews: 25,
    },
    {
        name: 'ثلاجة ال جي سمارت',
        image: 'https://images.pexels.com/photos/5824883/pexels-photo-5824883.jpeg',
        description:
            'ثلاجة ذكية بتقنية الإنفرتر وتوفير الطاقة وميزات متعددة للحفاظ على الطعام طازجًا.',
        brand: 'ال جي',
        category: 'أجهزة منزلية',
        price: 18999.99,
        countInStock: 4,
        rating: 4.2,
        numReviews: 9,
    },
    {
        name: 'غسالة سامسونج أوتوماتيك',
        image: 'https://images.pexels.com/photos/5816363/pexels-photo-5816363.jpeg',
        description:
            'غسالة ملابس أوتوماتيكية بسعة 10 كيلو وتقنيات متطورة للغسيل الفعال وتوفير الطاقة.',
        brand: 'سامسونج',
        category: 'أجهزة منزلية',
        price: 8999.99,
        countInStock: 8,
        rating: 4.4,
        numReviews: 14,
    },
    {
        name: 'مكتب خشبي مودرن',
        image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg',
        description:
            'مكتب خشبي أنيق بتصميم عصري مناسب للمنزل أو المكتب مع مساحة تخزين كافية.',
        brand: 'ايكيا',
        category: 'أثاث',
        price: 3299.99,
        countInStock: 6,
        rating: 4.1,
        numReviews: 7,
    },
    {
        name: 'مكنسة كهربائية دايسون',
        image: 'https://images.pexels.com/photos/4108714/pexels-photo-4108714.jpeg',
        description:
            'مكنسة كهربائية لاسلكية بقوة شفط عالية وبطارية طويلة الأمد وتقنيات متطورة للتنظيف.',
        brand: 'دايسون',
        category: 'أجهزة منزلية',
        price: 5999.99,
        countInStock: 9,
        rating: 4.7,
        numReviews: 18,
    },
];

module.exports = { products }; 