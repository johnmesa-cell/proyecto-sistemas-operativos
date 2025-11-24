from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, crud

app = FastAPI(title="Backend API - Curador Roadmaps")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las origins en desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(crud.router)

@app.get("/")
def root():
    return {"message": "Backend funcionando correctamente 🚀"}
