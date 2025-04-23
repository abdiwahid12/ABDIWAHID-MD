module.exports = async (sock, msg) => {
  const type = Object.keys(msg.message)[0];
  const jid = msg.key.remoteJid;

  if (type === 'imageMessage') {
    await sock.sendMessage(jid, { react: { text: '🖼️', key: msg.key } });
  } else if (type === 'videoMessage') {
    await sock.sendMessage(jid, { react: { text: '🎥', key: msg.key } });
  } else if (type === 'audioMessage') {
    await sock.sendMessage(jid, { react: { text: '🎧', key: msg.key } });
  }
};