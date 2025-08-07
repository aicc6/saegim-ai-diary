# ./frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# 의존성 설치를 위한 package.json 복사
COPY package*.json ./
RUN npm ci

# 나머지 소스 복사 (여기에는 .env.local도 포함되어 있어야 함)
COPY . .

# 정적 빌드
RUN npm run build

# 컨테이너 포트
EXPOSE 3000

# 앱 시작 명령어
CMD ["npm", "start"]
