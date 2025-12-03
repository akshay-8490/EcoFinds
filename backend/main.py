from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from database import Base, engine, SessionLocal
from models import User

# --- CRYPTOGRAPHY DEPENDENCY CHECK (Added for robust error handling) ---
try:
    # Attempt to import the required package for secure MySQL authentication
    import cryptography 
except ImportError:
    # If the import fails, raise a custom RuntimeError with clear installation instructions
    raise RuntimeError(
        "The 'cryptography' package is required for secure MySQL connections. "
        "Please install it using: pip install cryptography"
    )
# --- END CRYPTOGRAPHY CHECK ---

# Create tables in MySQL (runs once at startup)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# ---------- Enable CORS ----------
origins = [
    "http://localhost:5173",    # Vite dev server
    "http://127.0.0.1:5173",    # Sometimes Vite uses 127.0.0.1
    "http://127.0.0.1:5500",    # Origin for your front-end (Live Server, etc.)
    "http://localhost:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # You can also use ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],          # Allow POST, GET, OPTIONS, etc.
    allow_headers=["*"],          # Allow all headers
)

# ---------- Schemas ----------
class UserCreate(BaseModel):
    email: str
    username: str
    password: str

class LoginRequest(BaseModel):
    identifier: str     # can be email or username
    password: str

# 🌟 NEW SCHEMA for Profile Update 🌟
class UserUpdate(BaseModel):
    # We require the email to identify the user for updating
    email: str
    # The username (Full Name) is the field being updated
    username: str 
    # Add other editable fields if needed, e.g., phone_number: Optional[str] = None

# ---------- Dependency ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- Signup ----------
@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email or username already exists
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    # Allowing username change during update, but checking uniqueness during signup
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    # Save new user (⚠️ plain text password for now)
    new_user = User(
        email=user.email,
        username=user.username,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

# ---------- Login ----------
@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Find user by email OR username
    user = db.query(User).filter(
        (User.email == request.identifier) | (User.username == request.identifier)
    ).first()

    if not user or user.password != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Return minimal user info (exclude password)
    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }
    }

# ---------- Profile Update (Persistence Layer) ----------
@app.put("/profile/update")
def update_profile(updated_data: UserUpdate, db: Session = Depends(get_db)):
    # 1. Find the existing user using the email (which is assumed to be immutable/unique ID)
    user = db.query(User).filter(User.email == updated_data.email).first()

    if not user:
        # This shouldn't happen if the client sends a valid email from their session
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Check if the new username is already taken by another user
    if user.username != updated_data.username:
        existing_user_with_new_name = db.query(User).filter(
            User.username == updated_data.username
        ).first()
        
        if existing_user_with_new_name:
             raise HTTPException(status_code=400, detail="Username already taken by another user")

    # 3. Update the fields
    user.username = updated_data.username
    # Add other updates here if you support them (e.g., phone, location)

    # 4. Commit and refresh
    db.commit()
    db.refresh(user)

    # 5. Return the updated user info
    return {
        "message": "Profile updated successfully",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }
    }