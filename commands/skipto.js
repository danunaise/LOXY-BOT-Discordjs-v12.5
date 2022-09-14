const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Skip to the selected queue number",
  execute(message, args) {
    if (!args.length || isNaN(args[0]))
      return message
        .reply(`**${message.client.prefix}${module.exports.name} < หมายเลขคิว >**`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("❗ ไม่มีคิวอยู่เลย").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return message.reply(`❗ ไม่มีคิวมากพอ ${queue.songs.length} `).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ ข้ามไปยังเพลงที่ ${args[0] - 1} `).catch(console.error);
  }
};
