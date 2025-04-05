FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production --force

COPY . .

EXPOSE 3005

RUN npx prisma generate

# RUN npx prisma migrate deploy

RUN npm run build

CMD ["npm","run","start"]
