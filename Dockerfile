FROM node:12.13.1-alpine as build

WORKDIR /opt
COPY . .
RUN npm i
RUN npm run build


FROM node:12.13.1-alpine

WORKDIR /opt/app
ENV NODE_ENV=production
CMD ["npm", "run", "start"]
LABEL MAINTAINER="Kozlov Viktor <victor@kozlov.io>" VERSION="v1.0.0"

COPY --from=build --chown=node:node /opt/package.json package.json
COPY --from=build --chown=node:node /opt/build build

EXPOSE 3000

RUN npm i --production

USER node
