const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

const apikey = 'your_api_key_here'; // beddel API-ka halkan

const downloadHandler = async (msg, command, args) => {
  const query = args.join(' ');
  let url;

  try {
    if (command === 'tiktok') {
      url = `https://api.lolhuman.xyz/api/tiktok?apikey=${apikey}&url=${query}`;
    } else if (command === 'youtube') {
      url = `https://api.lolhuman.xyz/api/ytdl?apikey=${apikey}&url=${query}`;
    } else if (command === 'facebook') {
      url = `https://api.lolhuman.xyz/api/facebook?apikey=${apikey}&url=${query}`;
    } else {
      return msg.reply('Command-ka lama yaqaan. Isticmaal: !tiktok, !youtube, ama !facebook');
    }

    const res = await axios.get(url);
    const videoUrl = res.data.result.link || res.data.result.video || res.data.result;

    if (!videoUrl) return msg.reply('Video lama helin. Hubi URL-ka.');

    const media = await MessageMedia.fromUrl(videoUrl);
    await msg.reply(media);
  } catch (err) {
    console.error(err);
    msg.reply('Video laguma soo dejin karin. Isku day mar kale.');
  }
};

module.exports = downloadHandler;
