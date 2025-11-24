from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Conexiones a las bases de datos
DB_MASTER_URL = "mysql+pymysql://root:1234@db-master:3306/curador_db"
DB_SLAVE_URL = "mysql+pymysql://root:1234@db-slave:3306/curador_db"

engine_master = create_engine(DB_MASTER_URL, pool_pre_ping=True)
engine_slave = create_engine(DB_SLAVE_URL, pool_pre_ping=True)

# Session para ORM (necesario para autenticación)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine_master)

def get_db():
    """Dependencia para obtener sesión de base de datos"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
