
const fs = require("fs");
const path = require("path");
const welcomeImage = path.join(__dirname, "media", "pv5306.jpg");

module.exports = async (sock, update) => {
  const { id, participants, action } = update;

  for (let user of participants) {
    if (action === "add") {
      const buffer = fs.readFileSync(welcomeImage);
      const caption = `Ku soo dhawoow ${user.split("@")[0]}!`;
      await sock.sendMessage(id, {
        image: buffer,
        caption
      });
    }
  }
};
