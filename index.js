const makeWASocket = require('@whiskeysockets/baileys').default;
const { useSingleFileAuthState } = require('@whiskeysockets/baileys');
const P = require('pino');

const config = require('./config');
const help = require('./help');
const status = require('./status');
const ban = require('./ban');
const jokes = require('./jokes');
const welcome = require('./welcome');
const groupSettings = require('./groupSettings');
const mediaHandler = require('./mediaHandler');
const weather = require('./weather');
const news = require('./news');
const errorHandler = require('./errorHandler');

const { state, saveState } = useSingleFileAuthState('./session.json');

async function startBot() {
  const sock = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('group-participants.update', async (update) => {
    const jid = update.id;
    for (const participant of update.participants) {
      const event = update.action === 'add' ? 'join' : 'leave';
      welcome(sock, jid, event);
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const jid = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if (!text) {
      await mediaHandler(sock, msg);
      return;
    }

    const command = text.startsWith(config.prefix[0])
      ? text.slice(1).split(' ')[0].toLowerCase()
      : null;
    const args = text.split(' ').slice(1);

    switch (command) {
      case 'help':
        errorHandler(help)(sock, jid);
        break;
      case 'status':
        errorHandler(status)(sock, jid);
        break;
      case 'ban':
        if (args[0]) errorHandler(ban)(sock, jid, args[0] + '@s.whatsapp.net', 'ban');
        break;
      case 'unban':
        if (args[0]) errorHandler(ban)(sock, jid, args[0] + '@s.whatsapp.net', 'unban');
        break;
      case 'joke':
        errorHandler(jokes)(sock, jid);
        break;
      case 'weather':
        errorHandler(weather)(sock, jid, args[0]);
        break;
      case 'news':
        errorHandler(news)(sock, jid);
        break;
      case 'close':
      case 'open':
        errorHandler(groupSettings)(sock, jid, command);
        break;
      default:
        break;
    }
  });
}

startBot();