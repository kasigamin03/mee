const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);const {
  format,
  delay,
  isrequestchannel,
  edit_request_message_track_info,
  arrayMove
} = require("../../handlers/functions")
module.exports = {
  name: `stop`,
  category: `🎶 Music`,
  aliases: [`stop`, "fstop", "forcestop"],
  description: `Stops current track and leaves the channel`,
  usage: `stop`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if there is no current track error
      if (!player){
        if(message.guild.me.voice.channel) {
            return message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.SUCCESS} Stopped`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
            );
        }
        else {
          return message.channel.send(new MessageEmbed()
            .setFooter(ee.footertext, ee.footericon)
            .setColor(ee.wrongcolor)
            .setTitle(`${emoji.msg.ERROR} Error | No song is currently playing in this guild.`)
          );
        }
        return
      }
      
      if (player.queue && !player.queue.current) {
        if(message.guild.me.voice.channel) {
          player.stop()
            return message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.SUCCESS} Stopped`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
            );
        }
        else {
          return message.channel.send(new MessageEmbed()
            .setFooter(ee.footertext, ee.footericon)
            .setColor(ee.wrongcolor)
            .setTitle(`${emoji.msg.ERROR} Error | No song is currently playing in this guild.`)
          );
        }
        return
      }
        
    /*  setTimeout(()=>{
        try{
          message.guild.me.voice.channel.leave().catch(e=>console.log("PREVENTED BUG"))
        }catch{ }
        try{
          player.stop()
        }catch{ }
      }, 4000) */

      var irc = await isrequestchannel(client, player.textChannel, player.guild);
      if(irc) {
        edit_request_message_track_info(client, player, player.queue.current, "stop");
        return;
      }
      //stop playing
      player.stop();
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Stopped`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};