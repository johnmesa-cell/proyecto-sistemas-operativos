from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/auth", tags=["Auth"])

users_db = {"admin@example.com": {"password": "1234"}}

@router.post("/login")
def login(data: dict):
    email = data.get("email")
    password = data.get("password")
    user = users_db.get(email)
    if not user or user["password"] != password:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return {"status": "ok", "message": "Login exitoso"}
