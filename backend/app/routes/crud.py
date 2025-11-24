from fastapi import APIRouter
from app.database import engine_slave, engine_master
from sqlalchemy import text

router = APIRouter(prefix="/api/crud", tags=["CRUD"])

@router.get("/")
def get_items():
    with engine_master.connect() as conn:
        result = conn.execute(text("SELECT * FROM items"))
        items = [dict(row._mapping) for row in result]  # ← cambio clave
    return items

@router.post("/")
def create_item(data: dict):
    name = data.get("name", "sin nombre")
    with engine_master.connect() as conn:
        conn.execute(text("INSERT INTO items (name) VALUES (:name)"), {"name": name})
        conn.commit()
    return {"status": "ok", "message": f"Item '{name}' creado"}
