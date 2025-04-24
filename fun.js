const { sendText } = require('../utils/helpers');

module.exports = async (sock, msg, command, args, from) => {
  switch (command) {
    case 'jokes':
      await sendText(sock, from, 'Maxay ku leedahay shimbirta cilmi baaris? "Haddii ay sameyso, si fiican uga fikir!"');
      break;

    case 'advice':
      await sendText(sock, from, 'Nolosha waa tartan, ma ahan ciyaar. Si fiican u samee! 🏆');
      break;

    case 'trivia':
      const triviaQuestion = 'Waa maxay magaca caanka ah ee magaalada New York?';
      await sendText(sock, from, `Trivia: ${triviaQuestion}`);
      break;

    case 'randompic':
      await sock.sendMessage(from, {
        image: { url: 'https://source.unsplash.com/random/800x600' },
        caption: 'Sawir random ah'
      });
      break;

    case 'quote':
      await sendText(sock, from, '"Waxaad ka noqon kartaa qofka aad rabto inaad noqoto!" - Mahatma Gandhi');
      break;

    case 'smile':
      await sendText(sock, from, '😊 Smile! Farxad kuu raacday.');
      break;

    case 'dance':
      await sendText(sock, from, '💃🕺 Let’s dance together!');
      break;

    case 'highfive':
      await sendText(sock, from, '✋ High five!');
      break;

    case 'hug':
      await sendText(sock, from, '🤗 Hug! Ha la qabsano!');
      break;

    case 'poke':
      await sendText(sock, from, 'Poke! 👈😉');
      break;

    case 'wave':
      await sendText(sock, from, 'Wave! 👋');
      break;

    case 'nom':
      await sendText(sock, from, 'Nom nom nom! Cunto macaan.');
      break;

    case 'smug':
      await sendText(sock, from, '🧐 Smug Mode activated!');
      break;

    case 'wink':
      await sendText(sock, from, '😉 Wink!');
      break;

    case 'kick':
      await sendText(sock, from, '👢 Kick! Haye waa lagaa kicineyaa!');
      break;

    case 'slap':
      await sendText(sock, from, 'Slap! 😂');
      break;

    case 'happy':
      await sendText(sock, from, '😊 Be Happy!');
      break;

    default:
      await sendText(sock, from, `Amarka ${command} lama aqoonsan.`);
  }
};
