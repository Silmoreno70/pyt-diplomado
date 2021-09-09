FROM node:14-alpine

RUN mkdir -p /home/app/node && chown node /home/app/node

WORKDIR /home/app/node

USER node

COPY package.json yarn.lock ${WORKDIR}

RUN yarn install

COPY . ${WORKDIR}

ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}

CMD ["yarn", "start"]