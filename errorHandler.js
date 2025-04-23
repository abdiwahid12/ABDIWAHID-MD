module.exports = (fn) => async (...args) => {
  try {
    await fn(...args);
  } catch (error) {
    const sock = args[0];
    const jid = args[1];
    await sock.sendMessage(jid, { text: 'Waxaa dhacay qalad. Fadlan isku day mar kale.' });
    console.error(error);
  }
};