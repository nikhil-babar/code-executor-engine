FROM node:16-alpine3.11
RUN npm install -g nodemon
WORKDIR /app/
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "debug"]
