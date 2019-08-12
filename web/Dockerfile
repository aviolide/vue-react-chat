FROM node:10-alpine
RUN mkdir -p /web/

WORKDIR /web/

COPY ./web/ /web/

RUN npm install

ADD package.json /package.json
RUN cd ../ && npm install

ADD ./src /src
ADD ./configs /configs
ADD ./constants /constants
ADD tsconfig.json /tsconfig.json
CMD npm start
EXPOSE 3000
