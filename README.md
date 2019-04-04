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

## Development guidelines

### Overriding html metadata

For SEO / social sharing purposes some pages require custom metadata. We can set custom content for the following tags:

- `<title>` page title. Change this by defining a `title` property in the view
- `<description>` page description. Change this via the `description` view property.
- `<meta property="og:title">` open graph title. Change this via the `previewTitle` view property.
- `<meta property="og:image">` open graph image. Change this via the `image` view property.
- `<meta property="og:description">` open graph description. This is the same content as page description, so change this via the `description` view property.

Notes:

1. All override properties can be functions
2. If an override property is not defined, a default content will be used. See default metadata in `server.js` (`const context` definition).

Example:

```
<template>
  <div class="expert-container">
    Content
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ExpertView',

  computed: {
    ...mapGetters([ 'expert' ]),
  },

  title () {
    return `${this.expert.name} - Stockchase`
  },

  previewTitle () {
    return this.title()
  },

  description: 'This is just a plain string',

  image () {
    return this.expert.avatar
  },
}
</script>
```
