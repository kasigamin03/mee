const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo"],
  usage: "help [Command]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, user, text, prefix) => {
          const helpEmbed = new MessageEmbed()
          .setColor('GREEN')
          .setAuthor(`Vokey | HELP MENU`)
          .addField(`**❯ 👑 MUSIC [30]**`,"`nowplaying`, `pause`, `play` ,`queue`, `radio`, `remove`, `replay`, `resume`, `rewind`, `save`, `search`, `seek`, `shuffle`, `skip`, `stop`, `unshuffle`, `volume`, `autoplay`, `clearqueue`, `daysong`, `dragme`, `forward`, `join`,`jump`, `leave`, `loop or loopqueue`, `lyrics`, `move`")
          .addField(`**❯ 👑 FILTERS [3]**`,"`bassboost`, `clearfilter`, `filter`")
          .addField(`**❯ 👑 INFO [6]**`,"`botinfo`, `djmode`, `help`, `invite`, `ping`, `uptime`")
          .addField(`**❯ 👑 PREMIUM [3]**`, "`afk`, `plist`, `requestpremium`")
          .addField(`**❯ ⚙👑 SETTINGS [8]**`, "`adddj`, `playmsg`, `prefix`, `pruning`, `removedj`, `reset`, `settings`, `djonly`")
          .addField(`**❯ 👑 Owner [3]**`, "`addpremium`, `setsong`, `reload`")
         
      return message.channel.send(helpEmbed);
  }
}