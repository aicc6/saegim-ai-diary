FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

# 수정된 부분👇
COPY frontend/.env.local .env.local

COPY frontend/. .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]