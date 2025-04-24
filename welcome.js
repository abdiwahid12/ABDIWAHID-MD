
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

async function welcome(client, message) {
    const chat = await message.getChat();
    if (message.body.includes('@everyone')) {
        chat.sendMessage('Welcome everyone!');
    }
}

async function goodbye(client, participant) {
    const media = MessageMedia.fromFilePath('./media/goodbye.jpg');
    const chat = await client.getChatById(participant.chatId);
    chat.sendMessage(media, { caption: "Nabad gelyo saaxiib!" });
}

module.exports = { welcome, goodbye };
