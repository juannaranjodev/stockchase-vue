require('dotenv').load()
const merge = require('webpack-merge')

const baseEnv = {
  DISQUS_SHORTNAME: process.env.DISQUS_SHORTNAME,
}
const serverEnv = merge(baseEnv, {
  DATABASE_URL: process.env.DATABASE_URL,
})
const clientEnv = merge(baseEnv, {})

const stringify = (env) => {
  for (var k in env) {
    // ENV variables need to be stringified in order to be passed to the app.
    if (env.hasOwnProperty(k)) {
      env[k] = JSON.stringify(env[k])
    }
  }
  return env
}

const env = {
  client: stringify(clientEnv),
  server: stringify(serverEnv),
}

module.exports = env
