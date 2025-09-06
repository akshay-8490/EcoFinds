from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Escape @ as %40
DATABASE_URL = "mysql+pymysql://root:SQLdatabase05%40@localhost:3306/userDB"

engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()