FROM node:20-bullseye-slim

WORKDIR /app

COPY app/ ./
RUN npm install

CMD ["npm", "run", "dev"]