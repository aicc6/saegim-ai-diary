from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from .models import Base
from .routers import auth, users

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="새김 AI 다이어리 API",
    description="새김 AI 다이어리 백엔드 API",
    version="1.0.0",
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # 프론트엔드 URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "새김 AI 다이어리 API가 정상적으로 작동 중입니다."}

@app.get("/")
async def root():
    return {"message": "새김 AI 다이어리 API에 오신 것을 환영합니다!"} 