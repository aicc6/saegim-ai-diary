from fastapi import FastAPI

app = FastAPI(
    title="배포 테스트 API",
    description="배포 테스트용 백엔드 API",
    version="1.0.0",
)

@app.get("/health")
async def health_check():
    return {"status": "ok"} 