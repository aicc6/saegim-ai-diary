# 배포 테스트 프로젝트

Docker 배포 테스트를 위한 최소한의 Next.js + FastAPI 프로젝트

## 🚀 기술 스택

- **Frontend**: Next.js + TypeScript
- **Backend**: FastAPI + Python
- **Deployment**: Docker + Docker Compose

## 📁 프로젝트 구조

```
saegim-ai-diary/
│
├── frontend/          # Next.js 프론트엔드
│ ├── src/
│ │ └── app/         # Next.js App Router
│ │   ├── page.tsx   # 메인 페이지 ("프론트엔드 작동 확인")
│ │   ├── layout.tsx # 루트 레이아웃
│ │   └── globals.css # 기본 스타일
│ ├── Dockerfile     # Frontend Docker 설정
│ ├── package.json   # 의존성 관리 (최소한의 Next.js만)
│ └── tsconfig.json  # TypeScript 설정
│
├── backend/          # FastAPI 백엔드
│ ├── app/
│ │ └── main.py      # /health 라우트만 포함
│ ├── requirements.txt # FastAPI + uvicorn만
│ └── Dockerfile     # Backend Docker 설정
│
├── docker-compose.yml # 최소 Docker Compose 설정
├── .gitignore
└── README.md
```

## 🛠️ 배포 테스트 실행

### Docker Compose로 실행 (권장)
```bash
# 모든 서비스 빌드 및 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d --build
```

### 개별 서비스 실행 (개발용)

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🌐 확인 방법

Docker Compose 실행 후:
- **Frontend**: 컨테이너 내부에서 3000 포트로 실행 (Nginx Proxy Manager에서 라우팅)
- **Backend API**: 컨테이너 내부에서 8000 포트로 실행 (Nginx Proxy Manager에서 라우팅)
- **Backend Health Check**: `/health` 엔드포인트에서 `{"status": "ok"}` 반환

## 📦 특징

- ✅ 환경 변수 파일 없이 실행 가능
- ✅ 외부 API, DB 의존성 없음
- ✅ 포트 충돌 방지 (expose 사용)
- ✅ 최소한의 코드로 에러 없는 실행
- ✅ Nginx Proxy Manager 호환

## 🎯 목적

이 프로젝트는 **배포 테스트만을 위한** 최소 구조입니다.
- Frontend: "프론트엔드 작동 확인" 텍스트만 표시
- Backend: `/health` 엔드포인트만 제공
- 기능 구현이 아닌 Docker 배포 테스트가 목적 