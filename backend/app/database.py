from sqlalchemy import create_engine

##Puente entre la bases de datos, en el backend.
DB_MASTER_URL = "mysql+pymysql://root:1234@db-master:3306/curador_db"
DB_SLAVE_URL  = "mysql+pymysql://root:1234@db-slave:3306/curador_db"

engine_master = create_engine(DB_MASTER_URL, pool_pre_ping=True)
engine_slave = create_engine(DB_SLAVE_URL, pool_pre_ping=True)
