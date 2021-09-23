

FROM ubuntu:latest

# RUN nodejs npm
RUN apt-get update && apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y \
  nodejs
RUN echo "Node: " && node -v
RUN echo "NPM: " && npm -v

WORKDIR /app

COPY . /app


RUN npm install


EXPOSE 3000
# EXPOSE 5432
ENTRYPOINT [ "node" ]
CMD [ "server.js" ]