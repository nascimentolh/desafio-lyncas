FROM node:lts

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home

WORKDIR /home/node/api

COPY package.json yarn.* ./

USER node

RUN yarn install

COPY --chown=node:node . . 

EXPOSE 3333

RUN ["chmod", "+x", "/home/node/api/init.sh"]

ENTRYPOINT ["sh", "/home/node/api/init.sh"]