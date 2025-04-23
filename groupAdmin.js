module.exports = async (sock, jid, command, args, msg) => {
  const groupMetadata = await sock.groupMetadata(jid);
  const participants = groupMetadata.participants;
  const admins = participants.filter(p => p.admin);
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderName = participants.find(p => p.id === sender)?.notify || sender.split('@')[0];
  const isAdmin = admins.some(admin => admin.id === sender);

  if (!isAdmin) {
    return sock.sendMessage(jid, { text: "Kaliya admins ayaa sameyn kara arrintan." });
  }

  const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [];

  switch (command) {
    case 'tagall':
      const mentions = participants.map(p => p.id);
      const tagText = mentions.map((id, i) => `${i + 1}. @${id.split('@')[0]}`).join('\n');
      await sock.sendMessage(jid, {
        text: '*Tag All Members:*\n' + tagText,
        mentions
      });
      break;
    case 'promote':
      for (const id of mentioned) {
        await sock.groupParticipantsUpdate(jid, [id], 'promote');
        await sock.sendMessage(jid, {
          text: `@${id.split('@')[0]} waxaa admin u dhigay @${senderName}`,
          mentions: [id, sender]
        });
      }
      break;
    case 'demote':
      for (const id of mentioned) {
        await sock.groupParticipantsUpdate(jid, [id], 'demote');
        await sock.sendMessage(jid, {
          text: `@${id.split('@')[0]} waxaa admin-nimada lagala noqday by @${senderName}`,
          mentions: [id, sender]
        });
      }
      break;
    case 'remove':
      for (const id of mentioned) {
        await sock.groupParticipantsUpdate(jid, [id], 'remove');
        await sock.sendMessage(jid, { text: `@${id.split('@')[0]} waa laga saaray group-ka.`, mentions: [id] });
      }
      break;
    case 'add':
      for (const num of args) {
        const id = num.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        await sock.groupParticipantsUpdate(jid, [id], 'add');
        await sock.sendMessage(jid, { text: `@${id.split('@')[0]} waa lagu daray group-ka.`, mentions: [id] });
      }
      break;
  }
};