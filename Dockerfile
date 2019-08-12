FROM node:10-alpine
RUN mkdir -p /folder

WORKDIR /folder

COPY . /folder
COPY package.json /folder/package.json

RUN npm install

RUN pwd && ls && cat package.json

CMD npm run server:start
EXPOSE 4000