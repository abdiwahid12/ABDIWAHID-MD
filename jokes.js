const jokes = [
  "Maxaa sababay in mooska uu dariiqa ku dhaco? Wuxuu lahaa 'banana split'!",
  "Nin baa tiri: 'Computer-kaygu wuu fekerayaa'! Mid kale baa yiri: 'Waxaan filaa inaad tahay programmer!'"
];

module.exports = async (sock, jid) => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  await sock.sendMessage(jid, { text: joke });
};