import os
import jwt
from datetime import datetime, timedelta, timezone
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import bcrypt

from database import get_db, engine
from models import Base, User, Property, Subscription, Office, PLAN_DURATION_DAYS

SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "aqari_almuyassar_super_secret_key_2026")
ALGORITHM = "HS256"

app = FastAPI(title="عقاري الميسر - Aqari Al-Muyassar API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Pydantic Schemas
class RegisterSchema(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    password: str
    office_name: Optional[str] = None

class LoginSchema(BaseModel):
    phone_or_email: str
    password: str

@app.get("/")
async def root():
    return {"message": "مرحباً بك في واجهة برمجة تطبيقات عقاري الميسر"}

@app.post("/api/auth/register")
async def register(data: RegisterSchema, db: AsyncSession = Depends(get_db)):
    # Check if user exists
    stmt = select(User).where((User.phone == data.phone) | (User.email == data.email))
    result = await db.execute(stmt)
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="المستخدم موجود بالفعل بهذا الرقم أو البريد")

    hashed_pw = bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    office_id = None
    if data.office_name:
        new_office = Office(office_name=data.office_name, phone_number=data.phone)
        db.add(new_office)
        await db.flush()
        office_id = new_office.id

    new_user = User(
        name=data.name,
        phone=data.phone,
        email=data.email,
        password_hash=hashed_pw,
        office_id=office_id
    )
    db.add(new_user)
    await db.flush()

    # Create free trial subscription
    now = datetime.now(timezone.utc)
    trial_sub = Subscription(
        user_id=new_user.id,
        user_name=new_user.name,
        office_name=data.office_name,
        plan_type='free_trial',
        amount=0,
        start_date=now,
        end_date=now + timedelta(days=PLAN_DURATION_DAYS['free_trial']),
        status='active'
    )
    db.add(trial_sub)
    await db.commit()

    return {"message": "تم إنشاء الحساب بنجاح وتم تفعيل الفترة التجريبية"}