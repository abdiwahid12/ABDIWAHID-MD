module.exports = async (sock, jid) => {
  await sock.sendMessage(jid, { text: 'Botku wuu shaqaynayaa si caadi ah.' });
};