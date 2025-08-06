# 배포 테스트 프로젝트 - 설정 가이드

## 🚀 빠른 시작

### 1. 환경 변수 설정 불필요
이 프로젝트는 **.env 파일 없이** 실행 가능하도록 구성되었습니다.

### 2. Docker Compose로 실행

```bash
# 모든 서비스 빌드 및 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d --build
```

### 3. 개별 개발 환경

#### Frontend 개발
```bash
cd frontend
npm install
npm run dev
```

#### Backend 개발
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📁 프로젝트 구조

```
saegim-ai-diary/
│
├── frontend/          # Next.js 프론트엔드
│ ├── src/
│ │ ├── app/          # Next.js App Router
│ │ ├── components/   # 재사용 컴포넌트
│ │ └── store/        # Zustand 상태 관리
│ ├── Dockerfile
│ ├── package.json
│ └── ...
│
├── backend/           # FastAPI 백엔드
│ ├── app/
│ │ ├── api/          # API 라우터
│ │ ├── models/       # 데이터 모델
│ │ ├── schemas/      # Pydantic 스키마
│ │ ├── services/     # 비즈니스 로직
│ │ └── main.py       # 애플리케이션 진입점
│ ├── Dockerfile
│ ├── requirements.txt
│ └── ...
│
├── docker-compose.yml # Docker Compose 설정
├── .gitignore
├── README.md
└── SETUP.md
```

## 🌐 접속 정보

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API 문서**: http://localhost:8000/docs

## 🔧 개발 도구

### Frontend
- **Next.js 14**: React 프레임워크
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 스타일링
- **Zustand**: 상태 관리

### Backend
- **FastAPI**: Python 웹 프레임워크
- **SQLAlchemy**: ORM
- **PostgreSQL**: 데이터베이스
- **Pydantic**: 데이터 검증

## 📝 API 엔드포인트

### 다이어리 API
- `GET /api/v1/diary` - 다이어리 목록 조회
- `GET /api/v1/diary/{id}` - 특정 다이어리 조회
- `POST /api/v1/diary` - 새 다이어리 생성
- `PUT /api/v1/diary/{id}` - 다이어리 수정
- `DELETE /api/v1/diary/{id}` - 다이어리 삭제

## 🐛 문제 해결

### Docker 관련 문제
```bash
# 컨테이너 및 볼륨 완전 삭제
docker-compose down -v
docker system prune -a

# 다시 빌드
docker-compose up --build
```

### 데이터베이스 연결 문제
```bash
# PostgreSQL 컨테이너 상태 확인
docker-compose ps

# PostgreSQL 로그 확인
docker-compose logs db
```

### Frontend 빌드 문제
```bash
# node_modules 삭제 후 재설치
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Backend 의존성 문제
```bash
# 가상환경 재생성
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 📦 배포

### 학원 서버 배포
```bash
# 프로덕션 빌드
docker-compose -f docker-compose.yml up --build -d

# 서비스 중지
docker-compose down

# 로그 확인
docker-compose logs -f
```

### 환경 변수 설정 (프로덕션)
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://your-domain:8000

# backend/.env
DATABASE_URL=postgresql://postgres:password@db:5432/saegim_diary
SECRET_KEY=your-production-secret-key
```

## 🔒 보안 고려사항

1. **SECRET_KEY**: 프로덕션에서는 강력한 시크릿 키 사용
2. **CORS**: 프로덕션에서는 특정 도메인만 허용
3. **데이터베이스**: 강력한 비밀번호 사용
4. **환경 변수**: 민감한 정보는 환경 변수로 관리

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Docker 및 Docker Compose 설치 상태
2. 포트 충돌 여부 (3000, 8000, 5432)
3. 환경 변수 설정
4. 네트워크 연결 상태 