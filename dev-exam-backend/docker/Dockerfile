FROM nexusrepository.bradesco.com.br:8500/rhscl/nodejs-8-rhel7:1-9

WORKDIR bcpf-bff-bac

COPY . .

EXPOSE 8080
CMD [ "node", "./app/server.js"]