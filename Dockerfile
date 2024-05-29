# FRONTEND
FROM node:alpine

WORKDIR /usr/src/app 

COPY . /usr/src/app/

RUN npm install -g @angular/cli 

RUN npm install 

EXPOSE 8000

CMD ["ng", "serve", "--host", "0.0.0.0"]

# BACKEND
#FROM node:alpine 
#
#WORKDIR /usr/src/app
#
#COPY . /usr/src/app/
#
#RUN npm install
#
#RUN rm -r /usr/src/app/src/app/
#
#WORKDIR /usr/src/app/src/routes
#
#EXPOSE 8000
#
#CMD ["node", "index.js"]