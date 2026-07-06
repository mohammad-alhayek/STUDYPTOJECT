import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 5, // 5 محاولات فقط
    standardHeaders: true, // إرسال معلومات الـ Rate Limit في الـ Headers
    legacyHeaders: false, // إلغاء الـ Headers القديمة
    message: {
        message: "Too many login attempts. Please try again after 15 minutes."
    }
});