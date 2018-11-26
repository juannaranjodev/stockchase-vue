# stockchase-site-v2

This is the Stockchase website v2 project.

## Project structure

- `/server.js`, `/api`: [Express](https://expressjs.com/) for server & API
- `/models`: [Sequelize](http://docs.sequelizejs.com/) database models (used by both ExpressJS & Vue SSR)
- `/src`: [Vue SSR](https://ssr.vuejs.org/) for views (both server-rendered pages & frontend functionalities)
- `/build`: [Webpack](https://webpack.js.org/) for views & assets bundling

## Get Started

### Define ENV variables

``` bash
cp .env.example .env
```

Then define the ENV variables in `.env`.

### Run project

**Requires Node.js 7+**

#### With [Docker Compose](https://docs.docker.com/compose/)

``` bash
# install dependencies
docker-compose run app npm install

# serve in dev mode, with hot reload at localhost:8181
docker-compose up

# build for production
docker-compose run app npm run build

# serve in production mode
NODE_ENV=production docker-compose up
```

#### Without Docker Compose

``` bash
# install dependencies
npm install

# serve in dev mode, with hot reload at localhost:8181
PORT=8181 node_modules/.bin/forever -f -w server.js

# build for production
npm run build

# serve in production mode
NODE_ENV=production node_modules/.bin/forever -f -w server.js
```
