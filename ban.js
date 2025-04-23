const bannedUsers = new Set();

module.exports = async (sock, jid, number, action) => {
  if (action === 'ban') {
    bannedUsers.add(number);
    await sock.sendMessage(jid, { text: `${number} waa la ban gareeyay.` });
  } else {
    bannedUsers.delete(number);
    await sock.sendMessage(jid, { text: `${number} waa laga saaray ban.` });
  }
};