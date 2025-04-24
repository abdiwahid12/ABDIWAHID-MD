const { GroupSettingChange } = require('@whiskeysockets/baileys');
const config = require('../config');
const { sendText, isAdmin, getGroupAdmins, delay } = require('../utils/helpers');

module.exports = async (sock, msg, command, args, from, sender) => {
  const metadata = await sock.groupMetadata(from);
  const admins = getGroupAdmins(metadata.participants);
  const isSenderAdmin = admins.includes(sender);

  if (!isSenderAdmin && command !== 'info') {
    await sendText(sock, from, 'Amaradan waxay u baahanyihiin admin.');
    return;
  }

  switch (command) {
    case 'kickall':
      for (let p of metadata.participants) {
        if (!admins.includes(p.id) && p.id !== sock.user.id) {
          await sock.groupParticipantsUpdate(from, [p.id], 'remove');
          await delay(1000);
        }
      }
      break;

    case 'onlyadmin':
      await sock.groupSettingUpdate(from, GroupSettingChange.messageSend, true);
      await sendText(sock, from, 'Kaliya admin ayaa fariimo diri kara hadda.');
      break;

    case 'tagall':
      const mentions = metadata.participants.map(p => p.id);
      const names = metadata.participants.map(p => `@${p.id.split('@')[0]}`).join('\n');
      await sock.sendMessage(from, { text: names, mentions });
      break;

    case 'link':
      const code = await sock.groupInviteCode(from);
      await sendText(sock, from, `Link-ga Kooxda: https://chat.whatsapp.com/${code}`);
      break;

    case 'promote':
      if (msg.message.extendedTextMessage?.contextInfo?.participant) {
        const user = msg.message.extendedTextMessage.contextInfo.participant;
        await sock.groupParticipantsUpdate(from, [user], 'promote');
      }
      break;

    case 'demote':
      if (msg.message.extendedTextMessage?.contextInfo?.participant) {
        const user = msg.message.extendedTextMessage.contextInfo.participant;
        await sock.groupParticipantsUpdate(from, [user], 'demote');
      }
      break;

    case 'remove':
      if (msg.message.extendedTextMessage?.contextInfo?.participant) {
        const user = msg.message.extendedTextMessage.contextInfo.participant;
        await sock.groupParticipantsUpdate(from, [user], 'remove');
      }
      break;

    case 'del':
      if (msg.key.participant) {
        await sock.sendMessage(from, {
          delete: {
            remoteJid: from,
            fromMe: false,
            id: msg.message.extendedTextMessage.contextInfo.stanzaId,
            participant: msg.message.extendedTextMessage.contextInfo.participant
          }
        });
      }
      break;

    case 'info':
      await sendText(sock, from, `*Group Name:* ${metadata.subject}\n*Members:* ${metadata.participants.length}`);
      break;

    case 'antilink':
      config.antiLinkEnabled = !config.antiLinkEnabled;
      await sendText(sock, from, `Anti-link: ${config.antiLinkEnabled ? 'ON' : 'OFF'}`);
      break;

    case 'antibot':
      config.antiBotEnabled = !config.antiBotEnabled;
      await sendText(sock, from, `Anti-bot: ${config.antiBotEnabled ? 'ON' : 'OFF'}`);
      break;

    case 'group':
      const type = args[0];
      if (type === 'open') {
        await sock.groupSettingUpdate(from, GroupSettingChange.messageSend, false);
      } else if (type === 'close') {
        await sock.groupSettingUpdate(from, GroupSettingChange.messageSend, true);
      }
      break;

    case 'gname':
      const newName = args.join(' ');
      await sock.groupUpdateSubject(from, newName);
      break;

    case 'gdesc':
      const newDesc = args.join(' ');
      await sock.groupUpdateDescription(from, newDesc);
      break;

    case 'gpp':
      if (msg.message.imageMessage) {
        const buffer = await sock.downloadMediaMessage(msg);
        await sock.updateProfilePicture(from, buffer);
      }
      break;

    case 'hidetag':
      await sock.sendMessage(from, { text: args.join(' '), mentions: metadata.participants.map(p => p.id) });
      break;

    case 'fkick':
      const user = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
      await sock.groupParticipantsUpdate(from, [user], 'remove');
      break;

    case 'nsfw':
      config.nsfwEnabled = !config.nsfwEnabled;
      await sendText(sock, from, `NSFW is now: ${config.nsfwEnabled ? 'ON' : 'OFF'}`);
      break;

    case 'welcome':
      config.welcomeMessage = args.join(' ');
      await sendText(sock, from, 'Fariinta soo dhawaynta waa la cusbooneysiiyay.');
      break;

    case 'goodbye':
      config.goodbyeMessage = args.join(' ');
      await sendText(sock, from, 'Fariinta macsalaamada waa la cusbooneysiiyay.');
      break;

    case 'antipromote':
    case 'antidemote':
    case 'warn':
    case 'senttoall':
      await sendText(sock, from, `Command-ka *${command}* wali lama dhamaystirin.`);
      break;

    default:
      await sendText(sock, from, 'Command-kaas lama aqoonsan.');
  }
};
