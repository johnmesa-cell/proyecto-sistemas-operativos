from fastapi import FastAPI
from app.routes import auth, crud

app = FastAPI(title="Backend API - Curador Roadmaps")

app.include_router(auth.router)
app.include_router(crud.router)

@app.get("/")
def root():
    return {"message": "Backend funcionando correctamente 🚀"}
