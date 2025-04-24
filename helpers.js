const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const sendText = async (sock, jid, text) => {
  await sock.sendMessage(jid, { text });
};

const getGroupAdmins = (participants) => {
  return participants.filter(p => p.admin).map(p => p.id);
};

const isAdmin = (id, groupAdmins) => {
  return groupAdmins.includes(id);
};

module.exports = {
  delay,
  sendText,
  getGroupAdmins,
  isAdmin
};
