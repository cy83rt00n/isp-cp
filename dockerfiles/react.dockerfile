FROM node:8

ADD ./react/yarn.lock /yarn.lock
ADD ./react/package.json /package.json
ADD ./react/run.sh /run.sh

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN apt-get update  && apt-get install -y xsel curl
RUN yarn global add yarn serve
RUN yarn

EXPOSE 3000
EXPOSE 35729

ENTRYPOINT ["/bin/bash", "/run.sh"]
CMD ["start"]