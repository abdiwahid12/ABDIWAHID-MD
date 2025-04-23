require('dotenv').config();

module.exports = {
  owner: process.env.OWNER_NUMBER,
  botName: process.env.BOT_NAME || 'ABDIWAHID-MD',
  weatherApiKey: process.env.WEATHER_API_KEY,
  newsApiKey: process.env.NEWS_API_KEY,
  prefix: process.env.PREFIX || '!',
};