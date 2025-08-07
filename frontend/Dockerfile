FROM node:18-alpine

WORKDIR /app

# 설치용 파일만 먼저 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 🔥 환경변수 파일 명시적으로 복사
COPY .env.local .env.local

# 전체 앱 복사
COPY . .

# 앱 빌드
RUN npm run build

# 포트 설정
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]
