const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "leave",
        aliases: ["goaway", "disconnect", "bye"],
        description: "Leave The Voice Channel!",
        usage: "Leave",
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("I'm sorry but you need to be in a voice channel!", message.channel);
        if (!message.guild.me.voice.channel) return sendError("I Am Not In Any Voice Channel!", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("Trying To Leave The Voice Channel...", message.channel);
        }

        const Embed = new MessageEmbed()
            .setAuthor("Leave Voice Channel", "https://user-images.githubusercontent.com/46924550/153585710-42002a8f-45fc-495d-8c29-07b62d08486b.gif?raw=true")
            .setColor("#fffdd0")
            .setTitle("Success")
            .setDescription("🎶 Left The Voice Channel.\n Thank you for using my Bot, Hope you had a great time :) -DFALT")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("🎶 Left The Voice Channel :C"));
    },
};
