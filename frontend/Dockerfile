FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .              # ✅ .env.local 포함한 모든 소스 복사
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
