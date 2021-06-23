const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `grab`,
  category: `🎶 Music`,
  aliases: [`save`, `yoink`],
  description: `Saves the current playing song to your Direct Messages`,
  usage: `grab`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
   message.author.send(new MessageEmbed()
   .setAuthor(`Saved Song:`, message.author.displayAvatarURL({
    dynamic: true
  }))
  .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
  .setURL(player.queue.current.uri)
  .setColor(ee.color)
  .setFooter(ee.footertext, ee.footericon)
  .setTitle(`❯ ${player.playing ? `${emoji.msg.resume}` : `${emoji.msg.pause}`} **${player.queue.current.title}**`)
  .addField(`❯ Duration: `, `\`${format(player.queue.current.duration)}\``, true)
  .addField(`❯ Queue: `, `\`${player.queue.length} Songs\``, true)
  .addField(`${emoji.msg.playing} Play it:`, `\`${prefix}play ${player.queue.current.uri}\``)
  .addField(`${emoji.msg.search} Saved in:`, `<#${message.channel.id}>`)
  .setFooter(`❯ Requested by: ${player.queue.current.requester.tag} | in: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**❯ Vokey Here looks like your DMS are Closed**")
    })    

    message.react(emoji.react.SUCCESS).catch(e=>console.log("Could not react"))
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
