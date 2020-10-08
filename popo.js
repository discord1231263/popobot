const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzU5NzA0NDc4MTIyMzc3MjQ2.X3BX7g.ONoTwUUuc4wLdJgQbTMgJKiTurs';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
     if(!message.member.roles.find(role => role.name === '찬진')) return message.channel.send('명령어를 수행할 관리자 권한을 소지하고 있지않습니다.')
     .then(msg => msg.delete(3000));  
    
     message.reply('pong');
  }
  if(message.content === 'hi'){
     if(checkPermission(message)) return
     message.reply('안녕?')
  }
});

client.on('message', (message) => {
    if(message.content.startsWith("!투표")) {
        if(checkPermission(message)) return
        let args = message.content.split(" ") // ["!투표", "항목1/항목2/항목3", "시간(초)"]
        let list = args[1].split("/") // ["항목1", "항목2", "항목3"]
        let emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
        let tempString = ""
        let temp = 0
        if(!args) message.reply("`!투표 [항목1/항목2/항목3] 시간(1초 이상)` 이 올바른 명령어 입니다.")
        if(!args[2] || args[2] < 1) message.reply("`!투표 [항목1/항목2/항목3] 시간(1초 이상)` 이 올바른 명령어 입니다.")
        if(list > 5) message.reply("항목은 최대 5개까지 가능합니다.")
        let embed = new Discord.MessageEmbed()
        embed.setTitle(`${message.member.displayName}님의 투표`)
            for(let i=0; i<list.length; i++) {
                temp += 1
                tempString += `**${temp}. ${list[i]}**\n`
            }
        embed.setDescription(tempString)
        embed.setFooter(`투표시간: ${args[2]}초`)
        console.log('전송')
        message.channel.send({ embed: embed }).then(msg => {
            for(let i=0; i<list.length; i++) {
                msg.react(emojis[i])
            }
            setTimeout(function() {
                msg.edit(`<@!${message.author.id}> 투표가 종료되었습니다.`, { embed: embed })
                console.log('종료')
            }, parseInt(args[2])*1000)
        })
    }
})
function checkPermission(message) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
      return true;
    } else {
      return false;
    }
  }
  

client.login(token);
