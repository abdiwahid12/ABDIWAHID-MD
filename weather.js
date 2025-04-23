const axios = require('axios');
const config = require('./config');

module.exports = async (sock, jid, city = "Mogadishu") => {
  try {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.weatherApiKey}&units=metric`);
    const data = res.data;
    const text = `Cimilada ${data.name}:
Heerkulka: ${data.main.temp}°C
Xaaladda: ${data.weather[0].description}`;
    await sock.sendMessage(jid, { text });
  } catch {
    await sock.sendMessage(jid, { text: 'Waan ka xumahay, lama helin xogta cimilada.' });
  }
};