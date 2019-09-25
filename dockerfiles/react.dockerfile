FROM node:8

ADD ./www/react/yarn.lock /yarn.lock
ADD ./www/react/package.json /package.json
ADD ./www/react/run.sh /run.sh

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN apt-get update  && apt-get install xsel
RUN yarn global add yarn
RUN yarn global add serve
RUN yarn

EXPOSE 3000
EXPOSE 35729

ENTRYPOINT ["/bin/bash", "/run.sh"]
CMD ["start"]