module.exports = async (sock, jid, command) => {
  const isGroup = jid.endsWith('@g.us');
  if (!isGroup) return sock.sendMessage(jid, { text: 'Kani ma aha group.' });

  const setting = command === 'close' ? 'announcement' : 'not_announcement';
  await sock.groupSettingUpdate(jid, setting);
  await sock.sendMessage(jid, { text: `Group-ka waa la ${command === 'close' ? 'xiray' : 'furay'}.` });
};