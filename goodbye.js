
const fs = require("fs");
const path = require("path");
const goodbyeImage = path.join(__dirname, "media", "pv5306.jpg");

module.exports = async (sock, update) => {
  const { id, participants, action } = update;

  for (let user of participants) {
    if (action === "remove") {
      const buffer = fs.readFileSync(goodbyeImage);
      const caption = `Nabad gelyo ${user.split("@")[0]}!`;
      await sock.sendMessage(id, {
        image: buffer,
        caption
      });
    }
  }
};
