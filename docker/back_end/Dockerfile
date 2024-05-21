FROM node:14.20-alpine

WORKDIR /usr/src/app

COPY ./gestion-des-competences-backend-main/package.json ./
COPY ./gestion-des-competences-backend-main ./

RUN npm install
RUN npm install -g nodemon
#RUN npm install @angular/cli@~11.0.2
# If you are building your code for production
# RUN npm ci --only=production
#RUN npm install pm2 -g 

CMD [ "npm", "run", "start" ]

