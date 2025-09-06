from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import Base, engine, SessionLocal
from models import User

# Create tables in MySQL (runs once at startup)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# ---------- Enable CORS ----------
origins = [
    "http://localhost:5173",   # Vite dev server
    "http://127.0.0.1:5173",   # Sometimes Vite uses 127.0.0.1
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # You can also use ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],        # Allow POST, GET, OPTIONS, etc.
    allow_headers=["*"],        # Allow all headers
)

# ---------- Schemas ----------
class UserCreate(BaseModel):
    email: str
    username: str
    password: str

class LoginRequest(BaseModel):
    identifier: str  # can be email or username
    password: str

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
