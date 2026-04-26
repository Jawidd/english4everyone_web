# studio/Dockerfile — Sanity Studio local development
# Runs the Sanity Studio on port 3333
# Access at http://localhost:3333

FROM node:20-alpine

WORKDIR /studio

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
