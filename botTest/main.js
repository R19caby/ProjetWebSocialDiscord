const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", function () {
  console.log("Bot actif !");
});

client.on("message", function (message) {
  if (message.content === "Salut") {
    message.channel.send("Salut !");
    message.channel.send(
      "Ceci est un test : " +
        client.users.cache
          .map((u) => `${u.username}#${u.discriminator}`)
          .join(", ")
    );
    message.channel.send(
      "Test n°2 : " + client.guilds.cache.array().forEach((u) => console.log(u))
    );
  }

  if (message.content === "!restart") {
    message.channel.send("Redémarrage en cours...").then((m) => {
      client.destroy().then(() => {
        client.login(config.token);
      });
    });
    message.channel.send("Redémarrage terminé !");
  }
});

client.login(config.token);
