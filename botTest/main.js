const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

client.on("ready", function () {
  console.log("Bot actif !");
});

client.on("message", function (message) {
  if (message.content === "!help") {
    message.channel.send(
      'Utilisez "!channel" pour obtenir des informations sur les channels de ce serveur.'
    );
    message.channel.send(
      'Utilisez "!users" pour obtenir des informations sur les users présents sur ce serveur.'
    );
    message.channel.send(
      'Utilisez "!roles" pour obtenir des informations sur les rôles de ce serveur.'
    );
    message.channel.send(
      'Utilisez "!guild" pour obtenir des informations sur ce serveur.'
    );
    message.channel.send(
      'Utilisez "!members" pour obtenir des informations sur les membres de ce serveur.'
    );
    message.channel.send('Utilisez "*" pour obtenir le tout.');
  }

  if (message.content === "!membersOfServer") {
    var membersOfServer = "";

    membersOfServer += client.guilds.cache.map((server) =>
      server.members.cache.map((member) => member.displayName + "")
    );
    const embedMembersOfServer = new Discord.MessageEmbed()
      .setDescription(membersOfServer)
      .setColor("ORANGE");
    message.channel.send(embedMembersOfServer);
  }

  if (message.content === "!data") {
    fs.writeFileSync("./data.txt", "");
    writePrefixes();
    fs.appendFileSync("./data.txt", "\n\n");
  }

  if (message.content === "*") {
    message.channel.send("Bonjour !");

    var embedUserAll = data_users(client);
    message.channel.send(embedUserAll);

    var embedGuildAll = data_guild(client);
    message.channel.send(embedGuildAll);

    var embedMembersAll = data_members(client);
    message.channel.send(embedMembersAll);

    var embedRolesAll = data_roles(client);
    message.channel.send(embedRolesAll);

    var embedChannelAll = data_channel(client);
    message.channel.send(embedChannelAll);
  }

  if (message.content === "!channel") {
    var embedChannel = data_channel(client);
    message.channel.send(embedChannel);
  }

  if (message.content === "!roles") {
    var embedRoles = data_roles(client);
    message.channel.send(embedRoles);
  }

  if (message.content === "!users") {
    var embedUsers = data_users(client);
    message.channel.send(embedUsers);
  }

  if (message.content === "!members") {
    var embedMembers = data_members(client);
    message.channel.send(embedMembers);
  }

  if (message.content === "!guild") {
    var embedGuild = data_guild(client);
    message.channel.send(embedGuild);
  }

  if (message.content === "!restart") {
    message.channel.send("Redémarrage en cours...").then((m) => {
      client.destroy().then(() => {
        client.login(config.token);
      });
    });
    message.channel.send("Redémarrage terminé !");
  }

  if (message.content == "bad bot") {
    message.channel.send(":'(");
  }
  if (message.content == "good bot") {
    message.channel.send(":')");
  }
});

const data_members = (theClient) => {
  var stringMembers;
  var i = 0;
  stringMembers = "**Données pour !members : **\n";
  stringMembers += theClient.guilds.cache.map((tmpGuild) =>
    tmpGuild.members.cache.map((member) => {
      writeToStardogEntity("Member" + i, "Member");
      i++;
      writeToStardog("displayName", member.displayName + "");
      writeToStardog("nickname", member.nickname + "");
      writeToStardog("id", member.id + "");
      writeToStardogCustomType("user", member.user + "", "custom_discord:user");
      writeToStardog("displayColor", member.displayColor + "");
      writeToStardogCustomType(
        "guild",
        member.guild + "",
        "custom_discord:guild"
      );
      writeToStardog("joinedAt", member.joinedAt);
      writeToStardog(
        "lastMessageContent",
        member.lastMessage === null || member.lastMessage.content === null
          ? "undefined"
          : member.lastMessage.content
      );
      writeToStardog(
        "lastMessage",
        member.lastMessage === null ? "undefined" : member.lastMessage
      );
      writeToStardog("permissions", member.permissions);
      writeToStardog("presence", member.presence.status);
      var j = 0;
      member.roles.cache.map((tmpRole) => {
        writeToStardogCustomType(
          "Role" + j,
          tmpRole + "",
          "custom_discord:Role"
        );
        j++;
      });

      writeToFile("\n");
      return (
        "**Display Name** : " +
        member.displayName +
        "\n" +
        "**Nickname** : " +
        member.nickname +
        "\n" +
        "**ID** : " +
        member.id +
        "\n" +
        "**User** : " +
        member.user.username +
        " - " +
        member.user +
        "\n" +
        "**Display Color** : " +
        member.displayColor +
        "\n" +
        "**Guild** : " +
        member.guild.name +
        " - " +
        member.guild +
        "\n" +
        "**Joined at** : " +
        member.joinedAt +
        "\n" +
        "**Last message** : " +
        (member.lastMessage === null || member.lastMessage.content === null
          ? "undefined"
          : member.lastMessage.content) +
        "\n" +
        "**Last message ID** : " +
        (member.lastMessage === null ? "undefined" : member.lastMessage) +
        "\n" +
        "**Permissions** : " +
        member.permissions +
        "\n" +
        "**Presence** : " +
        member.presence +
        "\n" +
        "**Roles** : " +
        member.roles.cache.map((tmpRole) => tmpRole.name + " - " + tmpRole) +
        "\n\n"
      );
    })
  );

  const embed = new Discord.MessageEmbed()
    .setDescription(stringMembers)
    .setColor("ORANGE");
  return embed;
};

const data_roles = (theClient) => {
  var stringRoles;
  var i = 0;
  stringRoles = "**Données pour !roles : **\n";
  stringRoles += theClient.guilds.cache.map((guild) =>
    guild.roles.cache.map((role) => {
      writeToStardogEntity("Roles" + i, "Role");
      i++;
      writeToStardog("name", role.name + "");
      writeToStardog("id", role.id + "");
      writeToStardog("color", role.color + "");
      writeToStardog("createdAt", role.createdAt + "");
      writeToStardogCustomType(
        "guild",
        role.guild + "",
        "custom_discord:Guild"
      );
      var j = 0;
      role.members.map((mem) => {
        writeToStardogCustomType(
          "member" + j,
          mem + "",
          "custom_discord:Member"
        );
        j++;
      });
      writeToStardog("permissions", role.permissions + "");

      writeToFile("\n");
      return (
        "**Name** : " +
        role.name +
        "\n" +
        "**ID** : " +
        role.id +
        "\n" +
        "**Color** : " +
        role.color +
        "\n" +
        "**Created at** : " +
        role.createdAt +
        "\n" +
        "**Guild** : " +
        role.guild.name +
        " - " +
        role.guild +
        "\n" +
        "**Members** : " +
        role.members.map((mem) => mem.toString()) +
        "\n" +
        "**Permissions** : " +
        role.permissions +
        "\n\n"
      );
    })
  );

  const embed = new Discord.MessageEmbed()
    .setDescription(stringRoles)
    .setColor("NAVY");
  return embed;
};

const data_guild = (theClient) => {
  var stringGuild;
  stringGuild = "**Données pour !guild : **\n";
  if (theClient.guilds.cache.has("816289514707353660")) {
    var guild;
    guild = theClient.guilds.cache.get("816289514707353660");
    writeToStardogEntity("Guild", "Guild");
    writeToStardog("name", guild.name);
    writeToStardog("id", guild.id);
    var i = 0;
    guild.channels.cache.map((tmpChannel) => {
      writeToStardogCustomType(
        "Channel" + i,
        tmpChannel + "",
        "custom_discord:Channel"
      );
      i++;
    });
    i = 0;
    guild.roles.cache.map((tmpChannel) => {
      writeToStardogCustomType(
        "Role" + i,
        tmpChannel + "",
        "custom_discord:Role"
      );
      i++;
    });
    writeToStardog("applicationID", guild.applicationID);
    writeToStardog("createdAt", guild.createdAt);
    writeToStardog("joinedAt", guild.joinedAt);
    writeToStardog("description", guild.description);
    writeToStardog("memberCount", guild.memberCount);
    writeToStardogCustomType("owner", guild.owner, "custom_discord:User");
    writeToStardog("region", guild.region);
    writeToFile("\n");
    stringGuild +=
      "**Name** : " +
      guild.name +
      "\n" +
      "**ID** : " +
      guild.id +
      "\n" +
      "**Channels** :" +
      guild.channels.cache.map(
        (tmpChannel) => " " + tmpChannel.name + " - " + tmpChannel
      ) +
      "\n" +
      "**Roles** :" +
      guild.roles.cache.map((tmpRole) => " " + tmpRole.name + " - " + tmpRole) +
      "\n" +
      "**Application ID** : " +
      guild.applicationID +
      "\n" +
      "**Created at** : " +
      guild.createdAt +
      "\n" +
      "**Joined at** : " +
      guild.joinedAt +
      "\n" +
      "**Description** : " +
      guild.description +
      "\n" +
      "**Member count** : " +
      guild.memberCount +
      "\n" +
      "**Owner** : " +
      guild.owner.displayName +
      "\n" +
      "**Owner ID** : " +
      guild.ownerID +
      "\n" +
      "**Region** : " +
      guild.region;
  } else {
    stringGuild += "Aie, c'est une erreur";
  }
  const embed = new Discord.MessageEmbed()
    .setDescription(stringGuild)
    .setColor("DARK_AQUA");
  return embed;
};

const data_users = (theClient) => {
  var stringUsers;
  var i = 0;
  stringUsers = "**Données pour !users : **\n";
  stringUsers += theClient.users.cache.map((u) => {
    writeToStardogEntity("Users" + i, "User");
    i++;
    writeToStardog("username", u.username + "");
    writeToStardog("id", u.id + "");
    writeToStardog("avatar", u.avatar + "");
    writeToStardog("bot", u.bot + "");
    writeToStardog("createdAt", u.createdAt + "");
    writeToStardog("flags", u.flags + "");
    writeToStardog(
      "lastMessageContent",
      u.lastMessage === null ? "undefined" : u.lastMessage.content + ""
    );
    writeToStardog(
      "lastMessage",
      u.lastMessage === null ? "undefined" : u.lastMessage.id + ""
    );
    writeToStardog("presence", u.presence.status + "");
    writeToFile("\n");
    return (
      "**Username** : " +
      u.username +
      "\n" +
      "**ID** : " +
      u.id +
      "\n" +
      "**Avatar** : " +
      u.avatar +
      "\n" +
      "**Bot** : " +
      u.bot +
      "\n" +
      "**Created at** : " +
      u.createdAt +
      "\n" +
      "**Flags** : " +
      u.flags +
      "\n" +
      "**Last message** : " +
      (u.lastMessage === null ? "undefined" : u.lastMessage.content) +
      "\n" +
      "**Last message ID** : " +
      (u.lastMessage === null ? "undefined" : u.lastMessage.id) +
      "\n" +
      "**Presence** : " +
      u.presence.status +
      "\n\n"
    );
  });

  const embed = new Discord.MessageEmbed()
    .setDescription(stringUsers)
    .setColor("GREEN");
  return embed;
};

const data_channel = (theClient) => {
  var stringChannel;
  stringChannel = "**Données pour !channel : **\n";
  var i = 0;
  stringChannel += theClient.channels.cache.map((u) => {
    writeToStardogEntity("Channel" + i, "Channel");
    i++;
    writeToStardog("createdAt", u.createdAt + "");
    writeToStardog("id", u.id + "");
    writeToStardog("type", u.type + "");
    writeToFile("\n");
    return (
      "**Created at** : " +
      u.createdAt +
      "\n" +
      "**ID** : " +
      u.id +
      "\n" +
      "**Type** : " +
      u.type +
      "\n\n"
    );
  });

  const embed = new Discord.MessageEmbed()
    .setDescription(stringChannel)
    .setColor("AQUA");
  return embed;
};

const writeToFile = (toBeWritten) => {
  fs.appendFileSync("./data.txt", toBeWritten);
};

const writeToStardog = (attributeName, attributeValue) => {
  var attribute = "    custom_discord:";
  attribute += attributeName + ' "' + attributeValue + '"^^xsd:string ;\n';
  writeToFile(attribute);
};

const writeToStardogCustomType = (
  attributeName,
  attributeValue,
  attributeType
) => {
  var attributeCustom = "    custom_discord:";
  attributeCustom +=
    attributeName + " " + attributeValue + "^^" + attributeType + ";\n";
  writeToFile(attributeCustom);
};

const writeToStardogEntity = (entityName, entityType) => {
  var attributeEntity =
    ":" + entityName + " rdf:type custom_discord:" + entityType + " ;\n";
  writeToFile(attributeEntity);
};

const writePrefixes = () => {
  var prefixes =
    "@prefix : <http://api.stardog.com/> .\n" +
    "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n" +
    "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n" +
    "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n" +
    "@prefix stardog: <tag:stardog:api:> .\n" +
    "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n" +
    "@prefix custom_discord: <http://www.semanticweb.org/thalie/ontologies/2021/2/customed-ontology#> .\n";
  writeToFile(prefixes);
};

client.login(config.token);
