FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# .env.local 유무 확인 (있으면 출력, 없으면 무시)
RUN [ -f .env.local ] && echo ".env.local 포함됨" || echo ".env.local 없음"

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
