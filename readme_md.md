# مشروع عقاري الميسر - Aqari Al-Muyassar 🏡

مشروع إداري متكامل لإدارة العقارات والمكاتب العقارية، مصمم بأسلوب عصري يدعم اللغة العربية بشكل كامل (RTL) مع ربط متكامل بـ **Supabase (PostgreSQL)**.

## 🛠️ التقنيات المستخدمة
- **الباك إند (Backend):** FastAPI (Python) + SQLAlchemy (Async) + PostgreSQL (Supabase)
- **الفرنت إند (Frontend):** React.js + Tailwind CSS
- **قاعدة البيانات:** Supabase PostgreSQL

## 🚀 خطوات التشغيل المحلية

### 1. إعداد الباك إند:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # في نظام ينكس/ماك
# أو venv\Scripts\activate في نظام ويندوز
pip install -r requirements.txt
```

قم بإنشاء ملف `.env` داخل مجلد `backend` وأضف رابط اتصال Supabase:
```env
DATABASE_URL=postgresql+asyncpg://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE-ID].supabase.co:5432/postgres
JWT_SECRET_KEY=your_secret_key_here
```

تشغيل السيرفر:
```bash
uvicorn server:app --reload
```

---

## 📤 كيفية الرفع على GitHub:

1. قم بإنشاء المستودع (Repository) على حسابك في GitHub.
2. افتح موجه الأوامر في مجلد المشروع ونفذ الأوامر التالية:
```bash
git init
git add .
git commit -m "الإصدار الموحد النهائي لمشروع عقاري الميسر"
git branch -M main
git remote add origin https://github.com/USERNAME/aqari-almuyassar.git
git push -u origin main
```