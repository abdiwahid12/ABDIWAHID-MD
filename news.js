const axios = require('axios');
const config = require('./config');

module.exports = async (sock, jid) => {
  try {
    const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.newsApiKey}`);
    const article = res.data.articles[0];
    const text = `*War Cusub:* ${article.title}
${article.description}
${article.url}`;
    await sock.sendMessage(jid, { text });
  } catch {
    await sock.sendMessage(jid, { text: 'Ma helin war cusub hadda.' });
  }
};