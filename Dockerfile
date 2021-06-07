FROM node:14

RUN apt-get update && apt-get install -y lsb-release

RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' && \
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
apt-get update && \
apt-get -y install postgresql-client-12

WORKDIR /usr/src/app

EXPOSE 3000
CMD npm run dev
