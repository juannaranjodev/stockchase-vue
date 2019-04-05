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

### Code style guideline

Code style should follow Vue style guide https://vuejs.org/v2/style-guide. We use ESLint with the official Vue plugin to help with code linting during development. When in doubt, check the style guide.

### File/directory naming

#### `src/`

Currently there's a mix in file naming, but the following general rules should apply to anything under `src/`:

- `camelCase` for files that export a function. For example

    // createListView.js
    export default function createListView (type) {}

- `PascalCase` for components / view classes (as per Vue style guide). For example `OpinionsList.vue`

    // OpinionList.vue
    export default {
      name: 'OpinionsList',
      ...
    }

- `snake_case` for files under `src/assets/`. For legacy reasons some files have `kebab-case` but we should stick to `snake_case` when we can.

Notes: certain files have `-client` or `-server` suffix, that is for the build pipeline to know which file to use in the server side and which in the client side (since this is a VueSSR project). This is not considered `kebab-case`, and has nothing to do with the file naming conventions we use. These files can be `camelCase-client.js` or `PascalCase-client.vue`

#### `api/`

Since we use glob to turn the file names into api paths, these files should follow our desired api path naming convention, which is `snake_case`

#### `models/`

These files currently use `snake_case`. TODO: Maybe we should change these to `PascalCase` to match the class names?

#### Anything under the project root

No naming convention, it depends on the file's usage, for example `docker-compose.yml`, `README.md`...

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
