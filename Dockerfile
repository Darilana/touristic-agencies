FROM node:14

RUN apt-get update && apt-get install -y lsb-release postgresql-client

WORKDIR /usr/src/app

EXPOSE 3000
CMD npm run dev
