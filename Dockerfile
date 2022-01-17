FROM cypress/base:latest

WORKDIR /home/cypress

RUN npm install

CMD ["npm", "run", "cy:open"]