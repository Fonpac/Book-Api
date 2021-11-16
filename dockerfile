FROM node:lts-alpine

RUN apk add --no-cache curl

RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

RUN npm run build

USER node

EXPOSE 3000

CMD [ "node", "dist" ]
