require('dotenv').load();

const env = {
  APP_URL: process.env.APP_URL,
}

for (var k in env) {
  // ENV variables need to be stringified in order to be passed to the app.
  if (env.hasOwnProperty(k)) {
    env[k] = JSON.stringify(env[k])
  }
}

module.exports = env
