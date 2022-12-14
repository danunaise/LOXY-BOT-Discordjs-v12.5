const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("❗ ไม่มีเพลงเล่นอยู่เลย").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ✅ กลับมาเล่นต่อ!`).catch(console.error);
    }

    return message.reply("⚠ คิวไม่ได้หยุดชั่วคราว").catch(console.error);
  }
};
