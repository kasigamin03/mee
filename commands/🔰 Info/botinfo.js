const Discord = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
    duration
} = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Sends detailed info about the client",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                if (e) {
                    return console.log(String(e.stack).red);
                }
                let connectedchannelsamount = 0;
                let guilds = client.guilds.cache.map((guild) => guild);
                for (let i = 0; i < guilds.length; i++) {
                    if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                }
                if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                const botinfo = new Discord.MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle("Vokey | STATS")
                    .setColor(ee.color)
                    .addField("\u200b", `\u200b`, true)
                    .addField("📁 Users", `\`Total: ${client.users.cache.size} Users\``, true)
                    .addField("📁 Servers", `\`Total: ${client.guilds.cache.size} Servers\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``, true)
                    .addField("📁 Connected Channels", `\`${connectedchannelsamount}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("👾 Discord.js", `\`v${Discord.version}\``, true)
                    .addField("🤖 Node", `\`${process.version}\``, true)
                    .addField("⌚️ Uptime ", `\`${duration(client.uptime)}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("API Latency", `\`${client.ws.ping}ms\``, true)
                    .setFooter("Coded by: BunnyPro#5045");
                message.channel.send(botinfo);
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            );
        }
    },
};
