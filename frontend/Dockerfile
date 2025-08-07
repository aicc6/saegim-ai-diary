FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

# 🔥 핵심: .env.local을 명시적으로 복사
COPY .env.local .env.local

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
